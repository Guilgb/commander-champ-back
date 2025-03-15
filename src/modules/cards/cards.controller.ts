import { Body, Controller, Get, Post } from "@nestjs/common";
import { SaveCardsUseCase } from "./use-cases/save-cards/save-cards.use-case";
import { SaveCardsDto } from "./use-cases/save-cards/types/save-cards.dto";
import { CardsMetricsUseCase } from "./use-cases/cards-metrics/cards-metrics.use-case";
import { CardsMetricsDto } from "./use-cases/cards-metrics/dto/cards-metrics.dto";
import { DeckMetricsUseCase } from "../decks/use-cases/decks-metrics/deck-metrics.use-case";

@Controller("/cards")
export class CardsController {
  constructor(
    private readonly saveCardsUseCase: SaveCardsUseCase,
    private readonly cardsMetricsUseCase: CardsMetricsUseCase,
  ) { }

  @Post("/save")
  async saveCards(
    @Body() body: SaveCardsDto
  ) {
    return await this.saveCardsUseCase.execute(body);
  }

  @Get("/most-useds")
  async mostUsedCards(
    @Body() tournament_id: number
  ) {
    return await this.cardsMetricsUseCase.execute(tournament_id);
  }

  @Get("/metrics")
  async filterCard(
    @Body() body: CardsMetricsDto
  ) {
    return await this.cardsMetricsUseCase.execute(body);
  }
}