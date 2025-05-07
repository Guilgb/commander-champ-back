import { DBTournamentService } from "@modules/db/services/db-tournament.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TournamentInfoUseCase {
  constructor(
    private readonly dBTournamentService: DBTournamentService,
  ) {}
  async execute(id: number) { 
    return await this.dBTournamentService.getTournamentsInfoById(id);
  }
}