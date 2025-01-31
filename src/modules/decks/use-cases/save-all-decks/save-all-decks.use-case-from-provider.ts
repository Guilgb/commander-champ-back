import { Injectable } from "@nestjs/common";
import { TopdeckggService } from "src/modules/providers/topdeckgg/services/topdeckgg.service";
import { SaveAllDeckDto } from "./dto/save-all-decks.dto";
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
export class SaveAllDecksFromProviderUseCase {
  constructor(
    private readonly topdeckggService: TopdeckggService,
    private readonly moxFieldService: MoxfieldService,
    private readonly dbDeckService: DataBaseDecksService,
  ) { }
  async execute(input: SaveAllDeckDto) {
    try {
      const { url, tournament_id } = input;
      const allDecks = await this.topdeckggService.getTopDecks(url);

      const deckPromises = allDecks.map(async (deck) => {
        const { decklist } = deck;

        await new Promise(resolve => setTimeout(resolve, 1000));
        const deckLists = await this.moxFieldService.getMoxfieldDeck(decklist);

        if (deckLists) {
          const commanders = this.normalizeDeckData(deckLists.boards.commanders.cards)
          const color_identity = deckLists.colors;
          let username = deck.name;

          if (commanders) {
            const commander = commanders[0];
            const partner = commanders.length >= 1 ? commanders[1] : null;
            await this.dbDeckService.createDeck({
              username,
              decklist,
              tournament_id: tournament_id,
              wins: 0,
              losses: 0,
              draws: 0,
              color_identity,
              commander: commander.card.name,
              partner: partner ? partner.card.name : null,
            });
            return {
              username,
              url: decklist,
              commander,
              partner
            };
          }
        }
        return null;
      });
      const results = await Promise.all(deckPromises);

      const flattenedResults = results.flat().filter(result => result !== null);
      return flattenedResults;

    } catch (error) {
      console.log(error);
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
      console.log(error);
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