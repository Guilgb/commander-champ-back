import { Injectable } from "@nestjs/common";
import { CardsService } from "src/modules/db/services/cards.service";

@Injectable()
export class MostUsedsUseCase {
  constructor(
    private readonly cardsService: CardsService,
  ) { }

  async execute(body) {
    const test = await this.cardsService.getCards(body);
    return test;
  }
}