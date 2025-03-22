import { Injectable } from "@nestjs/common";
import { DBTournamentService } from "modules/db/services/db-tournament.service";

@Injectable()
export class ListTournamentsUseCase {
  constructor(
    private readonly tournamentService: DBTournamentService,
  ) { }

  async execute() {
    try {
      const tournaments = await this.tournamentService.listTournament();
      return tournaments;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}