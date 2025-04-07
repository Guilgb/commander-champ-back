import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { SaveAllDecksFromProviderUseCase } from "./use-cases/save-all-decks/save-all-decks.use-case-from-provider";
import { SaveAllDeckDto } from "./use-cases/save-all-decks/dto/save-all-decks.dto";
import { GetAllDecksByTournamentFromProviderUseCase } from "./use-cases/get-all-decks/get-all-decks-from-provider.use-case";
import { GetAllDecksByTournamentDto } from "./use-cases/get-all-decks/dto/get-all-decks.dto";
import { UpdateDeckUseCase } from "./use-cases/update-deck/update-deck.use-case";
import { UpdateDeckDto } from "./use-cases/update-deck/dto/update-deck.dto";
import { DeckMetricsUseCase } from "./use-cases/decks-metrics/deck-metrics.use-case";
import { DeckMetricsDto } from "./use-cases/decks-metrics/dto/deck-metrics.dto";
import { GetDecksStatisticsUseCase } from "./use-cases/get-decks-statistics/get-decks-statistics.use-case";
import { GetDecksStatisticsInput } from "./use-cases/get-decks-statistics/dto/get-decks-statistics.dto";
import { GetCommanderWinrateUseCase } from "./use-cases/get-commander-winrate/get-commander-winrate.use-case";


@Controller("/decks")
export class DecksController {
  constructor(
    private readonly saveAllDecksUseCaseFromProvider: SaveAllDecksFromProviderUseCase,
    private readonly getAllDecksFromProviderUseCase: GetAllDecksByTournamentFromProviderUseCase,
    private readonly updateDeckUseCase: UpdateDeckUseCase,
    private readonly deckMetricsUseCase: DeckMetricsUseCase,
    private readonly getDecksStatisticsUseCase: GetDecksStatisticsUseCase,
    private readonly getCommanderWinrateUseCase: GetCommanderWinrateUseCase,
  ) { }

  @Post("/save")
  async saveDecks(
    @Body() input: SaveAllDeckDto
  ) {
    return await this.saveAllDecksUseCaseFromProvider.execute(input);
  }

  @Get("/list")
  async listDecks(
  ) {
    return;
  }

  @Get("/list/tournament")
  async listDecksByTournament(
    @Body() input: GetAllDecksByTournamentDto
  ) {
    return await this.getAllDecksFromProviderUseCase.execute(input.tournament_id);
  }

  @Put("/update")
  async updateDeck(
    @Body() input: UpdateDeckDto
  ) {
    return await this.updateDeckUseCase.execute(input);
  }

  @Get("/metrics")
  async getMetrics(
    @Body() input: DeckMetricsDto
  ) {
    return await this.deckMetricsUseCase.execute(input);
  }

  @Post("/statistics")
  async getStatistics(
    @Body() input: GetDecksStatisticsInput
  ) {
    return await this.getDecksStatisticsUseCase.execute(input);
  }

  @Post("/statistics/commander-winrate")
  async getCommanderWinrate(
    @Body() input: GetDecksStatisticsInput
  ) {
    return await this.getCommanderWinrateUseCase.execute(input);
  }
}