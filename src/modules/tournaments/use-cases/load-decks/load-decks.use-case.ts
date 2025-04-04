import { Injectable } from "@nestjs/common";
import { LoadDecksinput, NormalizedDeck } from "./dto/load-decks.dto";
import { DBTournamentService } from "@modules/db/services/db-tournament.service";



@Injectable()
export class LoadDecksUseCase {
  constructor(
    private readonly dbTournamentService: DBTournamentService,
  ) { }
  async execute(input: LoadDecksinput) {
    try {
      return await this.dbTournamentService.loadDecksTournaments(input.tournament_id);
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}