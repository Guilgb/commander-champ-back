import { Injectable } from "@nestjs/common";
import { GetDecksStatisticsInput } from "./dto/get-commander-winrate.dto";
import { DBDecksService } from "@modules/db/services/db-decks.service";
import { DBTournamentService } from "@modules/db/services/db-tournament.service";

@Injectable()
export class GetCommanderWinrateUseCase {
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

    const decksTournaments = await Promise.all(
      tournaments.map(async (tournament) => {
        return {
          tournamentId: tournament.id,
          start_date: tournament.start_date,
          end_date: tournament.end_date,
          name: tournament.name,
          decks: await this.dbDecksService.getDecksByTournament(tournament.id),
        };
      })
    );

    const decksStatistics = decksTournaments.reduce((acc, tournament) => {
      tournament.decks.forEach((deck) => {
        const existingDeckEntries = acc.find((d) => d.commander === deck.commander);
        if (existingDeckEntries) {
          existingDeckEntries.entries += 1;
        }
        if (tournament.decks.some((d) => d.commander === deck.commander)) {
          const existingDeck = acc.find((d) => d.commander === deck.commander);
          if (existingDeck) {
            existingDeck.champion += deck.is_winner ? 1 : 0;
            existingDeck.wins += deck.wins;
            existingDeck.losses += deck.losses;
            existingDeck.draw += deck.draws;
          } else {
            const combinedCommanders = [deck.commander, deck.partner]
              .filter(Boolean)
              .sort()
              .join(" + ");
            acc.push({
              id: deck.id,
              name: tournament.name,
              username: deck.username,
              commander: deck.commander,
              partner: deck.partner,
              entries: 1,
              champion: deck.is_winner ? +1 : 0,
              colors: Array.isArray(deck.color_identity)
                ? deck.color_identity.filter((color) => typeof color === 'string').join('')
                : deck.color_identity.replace(/[^a-zA-Z]/g, ''),
              wins: deck.wins,
              losses: deck.losses,
              draws: deck.draws,
              winrate: this.calWinrate(deck.wins, deck.losses, deck.draws),
              start_date: tournament.start_date,
              end_date: tournament.end_date,
            });
          }
        }
      });
      return acc;
    }, []);
    return decksStatistics;
  }

  private calWinrate(wins, losses, draws): number {
    const games = (Number(wins) + Number(losses) + Number(draws));
    const cal = (Number(wins) / games)
    const res = Number((cal * 100).toFixed(2));
    return res;
  }
}