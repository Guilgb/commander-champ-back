import { Injectable } from "@nestjs/common";
import { UpdateAllDecksInput } from "./dto/update-all-decks.dto";
import { DBDecksService } from "@modules/db/services/db-decks.service";

@Injectable()
export class UpdateAllDecksUseCase {
  constructor(
    private readonly dbDecksService: DBDecksService
  ) {}
  
  async execute(input: UpdateAllDecksInput) {
    const { players, id } = input
    const tournamentId = Number(id)
    return await this.dbDecksService.updateAllDecks(players, tournamentId)
  }
}