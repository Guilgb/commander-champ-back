import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { CreateTournamentUseCase } from "./use-cases/create-tournaments/create-tournaments.use-case";
import { CreateTournamentDto } from "./use-cases/create-tournaments/dto/create-tournaments.dto";
import { ListTournamentsUseCase } from "./use-cases/list-tournaments/list-tournaments.use-case";
import { UpdateTournamentUseCase } from "./use-cases/update-tournaments/update-tournaments.use-case";
import { UpdateTournamentDto } from "./use-cases/update-tournaments/dto/update-tournaments.dto";
import { AuthGuard } from "@nestjs/passport";
import { LoadDecksUseCase } from "./use-cases/load-decks/load-decks.use-case";
import { LoadDecksinput } from "./use-cases/load-decks/dto/load-decks.dto";

@Controller("/tournaments")
// @UseGuards(AuthGuard('jwt'))
export class TournamentsController {
  constructor(
    private readonly createTournamentUseCase: CreateTournamentUseCase,
    private readonly listTournamentUseCase: ListTournamentsUseCase,
    private readonly updateTournamentsUseCase: UpdateTournamentUseCase,
    private readonly loadDecksUseCase: LoadDecksUseCase,
  ) { }

  @Post("/")
  async createTournament(
    @Body() body: CreateTournamentDto
  ) {
    console.log(body);
    return await this.createTournamentUseCase.execute(body);
  }

  @Get("/list")
  async listTournament(
  ) {
    return await this.listTournamentUseCase.execute();
  }

  @Put("/update")
  async updateTournament(
    @Body() body: UpdateTournamentDto
  ) {
    return await this.updateTournamentsUseCase.execute(body);
  }

  @Post("/load-decks")
  async loadDecks(
    @Body() input: LoadDecksinput
  ) {
    return await this.loadDecksUseCase.execute(input);
  }
}