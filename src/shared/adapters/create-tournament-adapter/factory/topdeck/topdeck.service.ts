import { DBCardsService } from "@modules/db/services/db-cards.service";
import { DBDecksService } from "@modules/db/services/db-decks.service";
import { DBTournamentService } from "@modules/db/services/db-tournament.service";
import { MoxfieldService } from "@modules/providers/moxfield/service/moxfield.service";
import { TopdeckggService } from "@modules/providers/topdeckgg/services/topdeckgg.service";
import { CreateTournamentDto, NormalizedDeck } from "@modules/tournaments/use-cases/create-tournaments/dto/create-tournaments.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TopdeckAdapterService {
  constructor(
    private readonly tournamentService: DBTournamentService,
    private readonly topDeckService: TopdeckggService,
    private readonly moxfieldService: MoxfieldService,
    private readonly dbDeckService: DBDecksService,
    private readonly cardsService: DBCardsService,
  ) { }

  async createTournament(input: CreateTournamentDto) {
    const { name, link, format, online, user_id, rounds, type, players, end_date, start_date } = input;
    try {
      if (players.length < 4) {
        throw new Error("You need at least 4 players to create a tournament");
      }

      const tournament = await this.tournamentService.createTournament({
        name: input.name,
        start_date: new Date(input.start_date),
        end_date: new Date(input.end_date),
        format: input.format,
        user_id: input.user_id,
        online: input.online,
        tournament_link: input.link,
      });

      if (!tournament) {
        throw new Error("Tournament creation failed");
      }

      const combinedDecks = {
        name: name,
        date: start_date,
        fromat: format,
        players: await Promise.all(players.map(async (player) => {
          const wins = player.wins;
          const draws = player.draws;
          const losses = player.losses;

          if (!player.decklist) {
            throw new Error("Player decklist is missing");
          }

          const commanderData = await this.moxfieldService.getMoxfieldDeck(player.decklist);

          if(!commanderData) {
            await this.dbDeckService.createDeck({
              username: player.name,
              decklist: player.decklist,
              tournament_id: tournament?.id,
              wins,
              losses,
              draws,
              color_identity: player.colors,
              commander: player.commander,
              cmc_commander: 4,
              partner: player.partner ? player.partner : null,
              is_winner: player.isWinner,
            });
            return {
              username: player.name,
              url: player.decklist,
              commander: player.commander,
              partner: player.partner,
            };
          }

          const commanders = this.normalizeDeckData(commanderData?.boards?.commanders?.cards)
          const color_identity = commanderData?.colors;

          if (commanders) {
            const commander = commanders[0];
            const partner = commanders?.length >= 1 ? commanders[1] : null;

            await this.dbDeckService.createDeck({
              username: player.name,
              decklist: player.decklist,
              tournament_id: tournament?.id,
              wins,
              losses,
              draws,
              color_identity,
              commander: commander.card.name,
              cmc_commander: commander.card.cmc,
              partner: partner ? partner.card.name : null,
              is_winner: player.isWinner
            });
            return {
              username: player.name,
              url: player.decklist,
              commander,
              partner,
            };
          }
          return null;
        })),
      };

      const allDeckList = await this.dbDeckService.getAllDecksByTournament(tournament.id);
      await Promise.all(
        allDeckList.decks.map(async (deck) => {
          try {
            const deckLists = await this.moxfieldService.getMoxfieldDeck(deck.decklist);
            if (deckLists) {
              const mainboardCards = deckLists.boards.mainboard.cards;
              for (const cardKey in mainboardCards) {
                const card = mainboardCards[cardKey].card;
                try {
                  if (card) {
                    await this.cardsService?.saveCards({
                      cmc: card.cmc,
                      color_identity: card.color_identity || null,
                      colors: card.colors,
                      mana_cost: card.mana_cost || null,
                      name: card.name,
                      type: card.type,
                      deck_id: deck.id,
                    });
                  } else {
                    console.error(`Card not found for key: ${cardKey}`);
                  }
                } catch (cardError) {
                  console.error(`Error saving card ${card.name}:`, cardError);
                }
              }
            }
          } catch (deckError) {
            console.error(`Error processing deck ${deck.id}:`, deckError);
          }
        })
      );

      return combinedDecks
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
      throw error;
    }
  }
}