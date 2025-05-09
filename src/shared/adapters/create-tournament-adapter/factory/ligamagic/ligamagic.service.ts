import { DBCardsService } from "@modules/db/services/db-cards.service";
import { DBDecksService } from "@modules/db/services/db-decks.service";
import { DBTournamentService } from "@modules/db/services/db-tournament.service";
import { LigaMagicService } from "@modules/providers/ligamagic/service/ligamagic.service";
import { CreateTournamentDto } from "@modules/tournaments/use-cases/create-tournaments/dto/create-tournaments.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LigaMagicAdapterService {
  constructor(
    private readonly ligaMagicService: LigaMagicService,
    private readonly tournamentService: DBTournamentService,
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
        start_date: start_date,
        end_date: end_date,
        format: format,
        user_id: user_id,
        online: online,
        tournament_link: link,
      });

      if (!tournament) {
        throw new Error("Tournament creation failed");
      }

      const combinedDecks = {
        name: name,
        date: start_date,
        format: format,
        players: await Promise.all(players.map(async (player) => {
          const wins = player.wins;
          const draws = player.draws;
          const losses = player.losses;
          const isWinner = Boolean(player.isWinner || false);

          if (!player.decklist) {
            throw new Error("Player decklist is missing");
          }

          const commmander = await this.ligaMagicService.getCommanders(player.commander);

          let partners = null;
          if (player.partner !== "") {
            partners = await this.ligaMagicService.getCommanders(player.partner);
          }

          if (commmander) {
            await this.dbDeckService.createDeck({
              username: player.name,
              decklist: player.decklist,
              position: player.position,
              tournament_id: tournament?.id,
              wins,
              losses,
              draws,
              color_identity: player.colors,
              commander: commmander.name,
              cmc_commander: commmander.mana_cost,
              partner: partners ? partners.name : null,
              is_winner: isWinner,
            });
            return {
              username: player.name,
              url: player.decklist,
              commmander,
              partners,
            };
          }
          return null;
        })),
      };
      const allDeckList = await this.dbDeckService.getAllDecksByTournament(tournament.id);
      await Promise.all(
        allDeckList.decks.map(async (deck) => {
          try {
            const deckLists = await this.ligaMagicService.getLigaMagicDeck(deck.decklist);
            if (deckLists) {
              deckLists.map(async (card) => {
                try {
                  await this.cardsService.saveCards({
                    name: card.name,
                    mana_cost: card.mana_cost.toString(),
                    colors: card.colors,
                    color_identity: card.color_identity,
                    type: card.type.toString(),
                    deck_id: deck.id,
                    cmc: card.mana_cost,
                  });
                } catch (error) {
                  console.error(`Card not found for key: ${card}`);
                }
              })
            }
          } catch (deckError) {
            console.error(`Error processing deck ${deck.id}:`, deckError);
          }
        })
      );
      return combinedDecks
    } catch (error) {
      throw error;
    }
  }
}