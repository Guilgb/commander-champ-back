import { Injectable } from "@nestjs/common";
import { DataBaseTournamentService } from "src/modules/db/services/dbtournament.service";

@Injectable()
export class ListTournamentsUseCase {
  constructor(
    private readonly tournamentService: DataBaseTournamentService,
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