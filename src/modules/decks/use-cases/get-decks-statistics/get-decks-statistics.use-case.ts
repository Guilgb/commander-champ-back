import { DBDecksService } from "@modules/db/services/db-decks.service";
import { DBTournamentService } from "@modules/db/services/db-tournament.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetDecksStatisticsUseCase {
  constructor(
    private readonly dbDecksService: DBDecksService,
    private readonly dbTournamentService: DBTournamentService,
  ) { }

  async execute() {
    const tournaments = await this.dbTournamentService.getTournamentsByDateRange(
      '2024-01-24',
      '2025-12-31'
    );

    if (!tournaments) {
      return [];
    }

    const top8ByTournament = await Promise.all(
      tournaments.map(async (tournament) => {
        return {
          tournamentId: tournament.id,
          top8: await this.dbDecksService.getTop8DecksByTournament(tournament.id),
          top4: await this.dbDecksService.getTop4DecksByTournament(tournament.id),
        };
      })
    );

    const deckStatistics = top8ByTournament.reduce((acc, tournament) => {
      tournament.top8.forEach((deck) => {
        const existingDeck = acc.find((d) => d.id === deck.id);
        if (existingDeck) {
          existingDeck.tournaments += 1;
          existingDeck.top8 += 1;
          if (tournament.top4.some((d) => d.id === deck.id)) {
            existingDeck.top4 += 1;
          }
          if (tournament.top4[0]?.id === deck.id) {
            existingDeck.champion += 1;
          }
        } else {
          const combinedCommanders = [deck.commander, deck.partner].filter(Boolean).sort().join(' + ');
          const existingCommander = acc.find((d) => d.commander === combinedCommanders);
          if (existingCommander) {
            existingCommander.tournaments += 1;
            existingCommander.top8 += 1;
            if (tournament.top4.some((d) => d.id === deck.id)) {
              existingCommander.top4 += 1;
            }
            if (tournament.top4[0]?.id === deck.id) {
              existingCommander.champion += 1;
            }
          } else {
            acc.push({
              id: deck.id,
              commander: combinedCommanders,
              tournaments: 1,
              top8: 1,
              top4: tournament.top4.some((d) => d.id === deck.id) ? 1 : 0,
              champion: tournament.top4[0]?.id === deck.id ? 1 : 0,
              colors: deck.colors,
            });
          }
        }
      });
      return acc;
    }, []);

    return deckStatistics;
  }
}