import { Injectable } from "@nestjs/common";
import { DBDecksService } from "modules/db/services/db-decks.service";
import { UpdateDeckDto } from "./dto/update-deck.dto";

@Injectable()
export class UpdateDeckUseCase {
  constructor(
    private readonly dbDeckService: DBDecksService,
  ) { }
  async execute(input: UpdateDeckDto) {
    await this.dbDeckService.updateDeck(input);
  }
}