import { Injectable } from "@nestjs/common";
import { TournamentService } from "src/modules/db/services/tournament.service";

@Injectable()
export class ListTournamentsUseCase {
  constructor(
    private readonly tournamentService: TournamentService,
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