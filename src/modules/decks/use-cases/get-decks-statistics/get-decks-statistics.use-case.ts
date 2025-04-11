import { DBDecksService } from "@modules/db/services/db-decks.service";
import { DBTournamentService } from "@modules/db/services/db-tournament.service";
import { Injectable } from "@nestjs/common";
import { GetDecksStatisticsInput } from "./dto/get-decks-statistics.dto";

@Injectable()
export class GetDecksStatisticsUseCase {
  constructor(
    private readonly dbDecksService: DBDecksService,
    private readonly dbTournamentService: DBTournamentService,
  ) { }

  async execute(input: GetDecksStatisticsInput) {
    let tournaments = [];
    const { start_date, end_date } = input;
    if (!start_date || !end_date) {
      tournaments = await this.dbTournamentService.getTournamentsByDateRange(
        "2023-01-24",
        "2026-12-31"
      );
      if (!tournaments) {
        return [];
      }
    } else {

      tournaments = await this.dbTournamentService.getTournamentsByDateRange(
        start_date,
        end_date
      );
      if (!tournaments) {
        return [];
      }
    }

    const top8ByTournament = await Promise.all(
      tournaments.map(async (tournament) => {
        return {
          tournamentId: tournament.id,
          top8: await this.dbDecksService.getTop8DecksByTournament(tournament.id),
          top4: await this.dbDecksService.getTop4DecksByTournament(tournament.id),
          decks: await this.dbDecksService.getDecksByTournament(tournament.id),
        };
      })
    );

    const decksStatistics = top8ByTournament.reduce((acc, tournament) => {
      tournament.decks.forEach((deck) => {
        const existingDeckEntries = acc.find((d) => d.commander === deck.commander);
        if (existingDeckEntries) {
          existingDeckEntries.entries += 1;
        }

        if (tournament.top8.some((d) => d.commander === deck.commander)) {
          const existingDeck = acc.find((d) => d.commander === deck.commander);
          if (existingDeck) {
            existingDeck.top8 += 1;
            if (tournament.top4.some((d) => d.commander === deck.commander)) {
              existingDeck.top4 += 1;
            }
            if (tournament.top4[0]?.commander === deck.commander) {
              existingDeck.champion += 1;
            }
          } else {
            const combinedCommanders = [deck.commander, deck.partner]
              .filter(Boolean)
              .sort()
              .join(" + ");
            acc.push({
              id: deck.id,
              commander: combinedCommanders,
              tournament_id: tournament.tournamentId,
              entries: 1,
              top8: tournament.top8.some((d) => d.commander === deck.commander) ? 1 : 0,
              top4: tournament.top4.some((d) => d.commander === deck.commander) ? 1 : 0,
              champion: deck.is_winner ? +1 : 0,
              colors: deck.color_identity
                .replace(/[\{\}\"]/g, "")
                .split(",")
                .map((color) => color.toUpperCase()),
            });
          }
        }
      });
      return acc;
    }, []);

    return decksStatistics;
  }
}