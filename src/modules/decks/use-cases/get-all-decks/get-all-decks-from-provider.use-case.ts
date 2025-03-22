import { Injectable } from "@nestjs/common";
import { DBDecksService } from "modules/db/services/db-decks.service";

@Injectable()
export class GetAllDecksByTournamentFromProviderUseCase {
  constructor(
    private readonly dbDeckService: DBDecksService,
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