import { Body, Controller, Get, Post, Put, UseGuards } from "@nestjs/common";
import { CreateTournamentUseCase } from "./use-cases/create-tournaments/create-tournaments.use-case";
import { CreateTournamentDto } from "./use-cases/create-tournaments/dto/create-tournaments.dto";
import { ListTournamentsUseCase } from "./use-cases/list-tournaments/list-tournaments.use-case";
import { UpdateTournamentUseCase } from "./use-cases/update-tournaments/update-tournaments.use-case";
import { UpdateTournamentDto } from "./use-cases/update-tournaments/dto/update-tournaments.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("/tournaments")
// @UseGuards(AuthGuard('jwt'))
export class TournamentsController {
  constructor(
    private readonly createTournamentUseCase: CreateTournamentUseCase,
    private readonly listTournamentUseCase: ListTournamentsUseCase,
    private readonly updateTournamentsUseCase: UpdateTournamentUseCase,
  ) { }

  @Post("/create")
  async createTournament(
    @Body() body: CreateTournamentDto
  ) {
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
}