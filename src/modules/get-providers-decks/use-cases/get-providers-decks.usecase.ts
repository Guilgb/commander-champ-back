import { Injectable, Logger } from "@nestjs/common";
import { GetDeckDto } from "./dto/get-providers-decks.dto";
import { PlatformValidator } from "src/shared/util/platform.validator";
import { TopDeck, TopdeckggService } from "src/modules/providers/topdeckgg/services/topdeckgg.service";
import { MoxfieldService } from "src/modules/providers/moxfield/service/moxfield.service";
import { CardsService } from "src/modules/db/services/cards.service";
import { TournamentService } from "src/modules/db/services/tournament.service";
import { DecksService } from "src/modules/db/services/decks.service";

@Injectable()
export class GetProvidersDecksUseCase {
  private readonly logger = new Logger(GetProvidersDecksUseCase.name);

  constructor(
    private readonly topdeckggService: TopdeckggService,
    private readonly moxfieldService: MoxfieldService,
    private readonly cardsService: CardsService,
    private readonly tournamentService: TournamentService,
    private readonly deckService: DecksService,
  ) { }

  async execute(input: GetDeckDto): Promise<any> {
    try {
      const platform = PlatformValidator.validatePlatform(input.provider);

      if (input.provider === 'topdeckgg') {

        const { url, tournament_name, start_date, end_date, format } = input;

        let decksArray = [];

        const { id } = await this.tournamentService.createTournament({
          name: tournament_name,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          format
        });

        const topDecks = await this.topdeckggService.getTopDecks(url);

        const deckPromises = topDecks.map(async (deck: TopDeck) => {
          const { decklist, name, } = deck;

          const deckLists = await this.retryRequest(() => this.moxfieldService.getMoxfieldDeck(decklist), decklist);

          if (deckLists) {
            const {
              name,
              format,
              commanders,
              mainboard
            } = deckLists;

            const maindeck = this.normalizeDeckData(mainboard);
            const commander = this.normalizeDeckData(commanders);

            let color_identity = [];

            if (commander === null || commander === undefined) {
              this.logger.error(`Failed to fetch deck list for URL: ${deck.decklist}`);
            } else if (commander.length === 1) {
              for (const ci of commander) {
                color_identity.push(...ci.card.color_identity);
              }
            } else if (commander.length > 0) {
              color_identity = commander[0].card.color_identity;
            }

            const deckData = {
              name,
              format,
              commanders: commander,
              color_identity: color_identity.flat(),
              deck: maindeck
            };

            if(deckData.name) decksArray.push(deckData);
          } else {
            this.logger.error(`Failed to fetch deck list for URL: ${deck.decklist}`);
          }
          for (const deck of decksArray) {

            const deckSave = await this.deckService.createDeck({
              decklist: decklist,
              tournament_id: id,
              draws: 0,
              losses: 0,
              wins: 0,
              username: name,
              commander: '',
              partner: '',
              color_identity: deck.color_identity,
            });

            deck.deck.map(async (card) => {
              await this.cardsService.saveCards({
                cmc: card.card.cmc,
                color_identity: card.card.color_identity,
                colors: card.card.colors,
                deck_id: deckSave.id,
                mana_cost: card.card.mana_cost,
                name: card.card.name,
                type: card.card.type,
              });
            });
          }
        });
        const decks = await Promise.all(deckPromises);

        return {
          status: 'success',
          message: 'Data fetched successfully',
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  private async retryRequest(requestFn: () => Promise<any>, url: string, retries = 2): Promise<any> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        if (attempt === retries) {
          this.logger.error(`Failed to fetch data from ${url} after ${retries} attempts: ${error.message}`);
          return null;
        }
      }
    }
  }

  private normalizeDeckData(data: any): any[] {
    try {
      const normalizedData = Object.keys(data).map(key => {
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
}