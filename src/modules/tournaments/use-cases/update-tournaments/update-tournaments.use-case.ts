import { Injectable } from "@nestjs/common";
import { DataBaseTournamentService } from "src/modules/db/services/db-tournament.service";
import { UpdateTournamentDto } from "./dto/update-tournaments.dto";

@Injectable()
export class UpdateTournamentUseCase {
  constructor(
    private readonly tournamentService: DataBaseTournamentService,
  ) { }
  async execute(input: UpdateTournamentDto) {
    try {
      const tournament = await this.tournamentService.updateTournament(input.id, {
        id: input.id,
        name: input.name,
        start_date: new Date(input.start_date),
        end_date: new Date(input.end_date),
        format: input.format
      });
      return tournament;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}