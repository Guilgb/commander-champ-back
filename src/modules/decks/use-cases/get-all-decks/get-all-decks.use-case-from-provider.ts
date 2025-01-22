import { Injectable } from "@nestjs/common";
import { TopdeckggService } from "src/modules/providers/topdeckgg/services/topdeckgg.service";
import { GetAllDeckDto } from "./dto/get-all-decks.dto";
import { MoxfieldService } from "src/modules/providers/moxfield/service/moxfield.service";
import { DataBaseDecksService } from "src/modules/db/services/dbdecks.service";


interface Card {
  name: string;
  cmc: number;
  type: string;
  mana_cost: string;
  colors: string[];
  color_identity: string[];
}

interface NormalizedDeck {
  name: string;
  card: Card;
}

@Injectable()
export class GetAllDecksFromProviderUseCase {
  constructor(
    private readonly topdeckggService: TopdeckggService,
    private readonly moxFieldService: MoxfieldService,
    private readonly dbDeckService: DataBaseDecksService
  ) { }
  async execute(input: GetAllDeckDto) {
    try {
      const { url } = input;
      const allDecks = await this.topdeckggService.getTopDecks(url);

      const deckPromises = allDecks.map(async (deck) => {
        const { decklist } = deck;
        const deckLists = await this.retryRequest(() => this.moxFieldService.getMoxfieldDeck(decklist), decklist);

        if (deckLists) {
          const commander = this.normalizeDeckData(deckLists.commanders);
          if (commander != null || commander != undefined) {
            if (commander.length > 0) {
              const [primaryCommander, secondaryCommander] = commander;
              const ci = primaryCommander.card.color_identity.concat(secondaryCommander.card.color_identity);
              await this.dbDeckService.createDeck({
                username: deckLists.username,
                decklist,
                tournament_id: 1,
                wins: 0,
                losses: 0,
                draws: 0,
                color_identity: ci,
                commander: primaryCommander.name,
                partner: secondaryCommander,
              });
              return {
                name: deck.name,
                url: decklist,
                primaryCommander,
                secondaryCommander
              };
            } else {
              const primaryCommander = commander[0];
              await this.dbDeckService.createDeck({
                username: deckLists.username,
                decklist,
                tournament_id: 1,
                wins: 0,
                losses: 0,
                draws: 0,
                color_identity: primaryCommander.card.color_identity,
                commander: primaryCommander.name,
                partner: null,
              });
              return {
                name: deck.name,
                url: decklist,
                primaryCommander,
                secondaryCommander: null
              };
            }
          }

        }
        return null;
      });
      const results = await Promise.all(deckPromises);

      const flattenedResults = results.flat().filter(result => result !== null);
      return flattenedResults;

    } catch (error) {
      throw new Error(error.message);
    }
  }
  private normalizeDeckData(data: any): any[] | null {
    try {
      const normalizedData: NormalizedDeck[] = Object.keys(data).map(key => {
        const card = data[key];
        return {
          name: key,
          card: {
            name: card.card.name,
            cmc: card.card.cmc,
            type: card.card.type,
            mana_cost: card.card.mana_cost,
            colors: card.card.colors,
            color_identity: card.card.color_identity,
          }
        };
      });
      return normalizedData;
    } catch (error) {
      return null;
    }
  }

  private async retryRequest(requestFn: () => Promise<any>, url: string, retries = 2): Promise<any> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        if (attempt === retries) {
          return null;
        }
      }
    }
  }
}