import { Body, Controller, Get, Post } from "@nestjs/common";
import { SaveCardsUseCase } from "./use-cases/save-cards/save-cards.use-case";
import { SaveCardsDto } from "./use-cases/save-cards/dto/save-cards.dto";
import { MostUsedsUseCase } from "./use-cases/most-useds/most-useds.use-case";
import { MostUsedsDto } from "./use-cases/most-useds/types/most-useds.dto";

@Controller("/cards")
export class CardsController {
  constructor(
    private readonly saveCardsUseCase: SaveCardsUseCase,
    private readonly mostUsedsUseCase: MostUsedsUseCase,
  ) { }

  @Post("/save")
  async saveCards(
    @Body() body: SaveCardsDto
  ) {
    return await this.saveCardsUseCase.execute(body);
  }

  @Get("/most-useds")
  async mostUsedCards(
    @Body() body: MostUsedsDto
  ) {
    return await this.mostUsedsUseCase.execute(body);
  }
}