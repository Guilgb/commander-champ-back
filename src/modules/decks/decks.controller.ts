import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { SaveAllDecksFromProviderUseCase } from "./use-cases/save-all-decks/save-all-decks.use-case-from-provider";
import { SaveAllDeckDto } from "./use-cases/save-all-decks/dto/save-all-decks.dto";
import { GetAllDecksByTournamentFromProviderUseCase } from "./use-cases/get-all-decks/get-all-decks-from-provider.use-case";
import { GetAllDecksByTournamentDto } from "./use-cases/get-all-decks/dto/get-all-decks.dto";

@Controller("/decks")
export class DecksController {
  constructor(
    private readonly saveAllDecksUseCaseFromProvider: SaveAllDecksFromProviderUseCase,
    private readonly getAllDecksFromProviderUseCase: GetAllDecksByTournamentFromProviderUseCase,
  ) { }

  @Post("/save")
  async saveDecks(
    @Body() body: SaveAllDeckDto
  ) {
    return await this.saveAllDecksUseCaseFromProvider.execute(body);
  }

  @Get("/list")
  async listDecks(
  ) {
    return;
  }

  @Get("/list/tournament")
  async listDecksByTournament(
    @Body() body: GetAllDecksByTournamentDto
  ) {
    return await this.getAllDecksFromProviderUseCase.execute(body.tournament_id);
  }
}