import { Injectable } from "@nestjs/common";
import { DeleteTournamentDto } from "./dto/delete-tournament.dto";
import { DBTournamentService } from "@modules/db/services/db-tournament.service";
import { DBCardsService } from "@modules/db/services/db-cards.service";
import { DBDecksService } from "@modules/db/services/db-decks.service";

@Injectable()
export class DeleteTournamentUseCase {
  constructor(
    private readonly tournamentService: DBTournamentService,
    private readonly deckService: DBDecksService,
    private readonly cardService: DBCardsService,
  ) { }
  async execute(input: DeleteTournamentDto) {
    const { id } = input;
    try {
      return await this.tournamentService.deleteTournament(id);
    } catch (error) {
      throw new Error(`Failed to delete tournament: ${error.message}`);
    }
  }
}