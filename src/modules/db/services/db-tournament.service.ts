import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TournamentEntity } from "../entities/tournaments.entity";
import { TournamentDto } from "modules/get-providers-decks/use-cases/dto/tournaments.dto";

@Injectable()
export class DBTournamentService {
  constructor(
    @InjectRepository(TournamentEntity)
    private readonly tournamentRepository: Repository<TournamentEntity>,
  ) { }

  async createTournament(input: TournamentDto): Promise<TournamentDto> {

    const tournament = await this.tournamentRepository.save({
      name: input.name,
      start_date: input.start_date,
      end_date: input.end_date,
      format: input.format,
      user_id: { id: input.user_id }
    });
    return {
      id: tournament.id,
      name: tournament.name,
      start_date: tournament.start_date,
      end_date: tournament.end_date,
      format: tournament.format,
      user_id: tournament.user_id.id,
      online: tournament.online,
    };
  }

  async listTournament(): Promise<any> {
    return this.tournamentRepository.find();
  }

  async getTournamentById(id: number): Promise<TournamentDto> {
    const tournament = await this.tournamentRepository.findOneBy({ id: id });
    if (!tournament) {
      return null;
    }
    return {
      id: tournament.id,
      name: tournament.name,
      start_date: tournament.start_date,
      end_date: tournament.end_date,
      format: tournament.format,
      user_id: tournament.user_id.id,
      online: tournament.online,
    };
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
    tournament.user_id = input.user_id;

    await this.tournamentRepository.update(id, {
      name: tournament.name,
      start_date: tournament.start_date,
      end_date: tournament.end_date,
      format: tournament.format,
      user_id: { id: input.user_id },
    });

    return this.getTournamentById(id);
  }

  async deleteTournament(id: number): Promise<void> {
    await this.tournamentRepository.delete(id);
  }
}