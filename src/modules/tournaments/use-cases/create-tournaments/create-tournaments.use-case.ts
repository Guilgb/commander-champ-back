import { Inject, Injectable } from "@nestjs/common";
import { CreateTournamentDto } from "./dto/create-tournaments.dto";
import { CreateTournamentAdapterInterface } from "@shared/adapters/create-tournament-adapter/create-tournament-adapter.interface";

@Injectable()
export class CreateTournamentUseCase {
  constructor(
    @Inject('CreateTournamentAdapterInterface')
    private readonly createTournamentAdapter: CreateTournamentAdapterInterface,
  ) { }

  async execute(input: CreateTournamentDto) {
    try {
      return await this.createTournamentAdapter.createTournament(input);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}