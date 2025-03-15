import { Injectable } from "@nestjs/common";
import { DBTournamentService } from "src/modules/db/services/db-tournament.service";
import { CreateTournamentDto } from "./dto/create-tournaments.dto";

@Injectable()
export class CreateTournamentUseCase {
  constructor(
    private readonly tournamentService: DBTournamentService,
  ) { }

  async execute(input: CreateTournamentDto) {
    try {
      const tournament = await this.tournamentService.createTournament({
        name: input.name,
        start_date: new Date(input.start_date),
        end_date: new Date(input.end_date),
        format: input.format,
        user_id: input.user_id
      });
      return tournament;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}