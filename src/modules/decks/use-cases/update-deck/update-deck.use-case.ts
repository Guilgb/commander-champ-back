import { Injectable } from "@nestjs/common";
import { DataBaseDecksService } from "src/modules/db/services/dbdecks.service";
import { UpdateDeckDto } from "./dto/update-deck.dto";

@Injectable()
export class UpdateDeckUseCase {
  constructor(
    private readonly dbDeckService: DataBaseDecksService,
  ) { }
  async execute(input: UpdateDeckDto) {
    await this.dbDeckService.updateDeck(input);
  }
}