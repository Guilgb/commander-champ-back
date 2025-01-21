import { Injectable } from "@nestjs/common";
import { TopdeckggService } from "src/modules/providers/topdeckgg/services/topdeckgg.service";
import { GetAllDeckDto } from "./dto/get-all-decks.dto";

Injectable()
export class GetAllDecksUseCaseFromProvider {
  constructor(
    private readonly topdeckggService: TopdeckggService,
  ) { }
  async execute(input: GetAllDeckDto) {
    try {
      const { url } = input;
      const deck = await this.topdeckggService.getTopDecks(url);
      return deck;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}