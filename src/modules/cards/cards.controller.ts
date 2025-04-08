import { Body, Controller, Get, Post } from "@nestjs/common";
import { SaveCardsUseCase } from "./use-cases/save-cards/save-cards.use-case";
import { SaveCardsDto } from "./use-cases/save-cards/dto/save-cards.dto";
import { CardsMetricsUseCase } from "./use-cases/cards-metrics/cards-metrics.use-case";
import { CardsMetricsDto } from "./use-cases/cards-metrics/dto/cards-metrics.dto";
import { DeckMetricsUseCase } from "../decks/use-cases/decks-metrics/deck-metrics.use-case";
import { ListMostUserCardsByDateUseCase } from "./use-cases/list-most-user-cards-by-date/list-most-user-cards-by-date.use-case";
import { ListMostUserCardsByDateInput } from "./use-cases/list-most-user-cards-by-date/dto/list-most-user-cards-by-date.dto";

@Controller("/cards")
export class CardsController {
  constructor(
    private readonly saveCardsUseCase: SaveCardsUseCase,
    private readonly cardsMetricsUseCase: CardsMetricsUseCase,
    private readonly listMostUserCardsByDateUseCase: ListMostUserCardsByDateUseCase,
  ) { }

  @Post("/save")
  async saveCards(
    @Body() input: SaveCardsDto
  ) {
    return await this.saveCardsUseCase.execute(input);
  }

  @Get("/most-useds")
  async mostUsedCards(
    @Body() tournament_id: number
  ) {
    return await this.cardsMetricsUseCase.execute(tournament_id);
  }

  @Get("/metrics")
  async filterCard(
    @Body() input: CardsMetricsDto
  ) {
    return await this.cardsMetricsUseCase.execute(input);
  }

  @Post("/metrics/list")
  async listMostUserCardsByDate(
    @Body() input: ListMostUserCardsByDateInput
  ) {
    return await this.listMostUserCardsByDateUseCase.execute(input);
  }
}