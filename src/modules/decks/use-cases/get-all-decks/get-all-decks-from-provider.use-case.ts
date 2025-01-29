import { Injectable } from "@nestjs/common";
import { DataBaseDecksService } from "src/modules/db/services/dbdecks.service";

@Injectable()
export class GetAllDecksByTournamentFromProviderUseCase {
  constructor(
    private readonly dbDeckService: DataBaseDecksService,
  ) { }

  async execute(tournament_id: number) {
    try {
      const allDecks = await this.dbDeckService.getAllDecksByTournament(tournament_id);
      return allDecks;
    } catch (error) {
      throw new Error(error);
    }
  }
}