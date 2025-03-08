import { Injectable } from "@nestjs/common";
import { DbDecksService } from "src/modules/db/services/db-decks.service";

@Injectable()
export class GetAllDecksByTournamentFromProviderUseCase {
  constructor(
    private readonly dbDeckService: DbDecksService,
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