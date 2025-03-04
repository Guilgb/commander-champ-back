import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TournamentEntity } from "../entities/tournaments.entity";
import { TournamentDto } from "src/modules/get-providers-decks/use-cases/dto/tournaments.dto";

@Injectable()
export class DataBaseTournamentService {
  constructor(
    @InjectRepository(TournamentEntity)
    private readonly tournamentRepository: Repository<TournamentEntity>,
  ) { }

  async createTournament(input: TournamentDto): Promise<TournamentDto> {

    const tournament = this.tournamentRepository.save({
      name: input.name,
      start_date: input.start_date,
      end_date: input.end_date,
      format: input.format,
    });
    return tournament;
  }

  async listTournament(): Promise<any> {
    return this.tournamentRepository.find();
  }

  async getTournamentById(id: number): Promise<TournamentDto> {
    return this.tournamentRepository.findOneBy({ id: id });
  }

  async updateTournament(id: number, input: TournamentDto): Promise<TournamentDto> {
    const tournament = await this.getTournamentById(id);

    if (!tournament) {
      throw new Error("Tournament not found");
    }

    tournament.name = input.name;
    tournament.start_date = input.start_date;
    tournament.end_date = input.end_date;
    tournament.format = input.format;

    await this.tournamentRepository.update(id, tournament);

    return this.getTournamentById(id);
  }

  async deleteTournament(id: number): Promise<void> {
    await this.tournamentRepository.delete(id);
  }
}