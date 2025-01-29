import { Body, Controller, Post } from "@nestjs/common";
import { SaveCardsUseCase } from "./use-cases/save-cards/save-cards.use-case";
import { SaveCardsDto } from "./use-cases/save-cards/dto/save-cards.dto";

@Controller("/cards")
export class CardsController {
  constructor(
    private readonly saveCardsUseCase: SaveCardsUseCase,
  ) { }

  @Post("/save")
  async saveCards(
    @Body() body: SaveCardsDto
  ) {
    return await this.saveCardsUseCase.execute(body);
  }
}