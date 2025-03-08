import { Injectable } from "@nestjs/common";
import { DbDecksService } from "src/modules/db/services/db-decks.service";
import { UpdateDeckDto } from "./dto/update-deck.dto";

@Injectable()
export class UpdateDeckUseCase {
  constructor(
    private readonly dbDeckService: DbDecksService,
  ) { }
  async execute(input: UpdateDeckDto) {
    await this.dbDeckService.updateDeck(input);
  }
}