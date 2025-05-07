import { Injectable } from "@nestjs/common";
import { Repository, MoreThanOrEqual, LessThanOrEqual } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TournamentEntity } from "../entities/tournaments.entity";
import { TournamentDto } from "modules/get-providers-decks/use-cases/dto/tournaments.dto";
import { DeckEntity } from "../entities/decks.entity";

@Injectable()
export class DBTournamentService {
  constructor(
    @InjectRepository(TournamentEntity)
    private readonly tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(DeckEntity)
    private readonly decksEntity: Repository<DeckEntity>,
  ) { }

  async createTournament(input: TournamentDto): Promise<TournamentDto> {
    const tournament = await this.tournamentRepository.save({
      name: input.name,
      start_date: input.start_date,
      end_date: input.end_date,
      format: input.format,
      user_id: { id: input.user_id },
      tournament_link: input.tournament_link,
    });
    return {
      id: tournament.id,
      name: tournament.name,
      start_date: tournament.start_date,
      end_date: tournament.end_date,
      format: tournament.format,
      user_id: tournament.user_id.id,
      online: tournament.online,
      tournament_link: tournament.tournament_link,
    };
  }

  async listTournament(): Promise<any> {
    return this.tournamentRepository.find();
  }

  async deleteTournamentById(id: number): Promise<void> {
    const tournament = await this.tournamentRepository.findOneBy({ id: id });
    if (!tournament) {
      throw new Error("Tournament not found");
    }
    await this.tournamentRepository.delete(id);
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
      tournament_link: tournament.tournament_link,
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

  async loadDecksTournaments(tournament_id: number): Promise<any> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournament_id },
      relations: ["decks"],
    });

    if (!tournament) {
      throw new Error("Tournament not found");
    }

    const decks = await this.decksEntity.findBy({
      tournament_id: { id: tournament_id },
    });

    if (!decks) {
      throw new Error("Tournament not found");
    }
    return {
      id: tournament.id,
      name: tournament.name,
      location: 'none',
      start_date: tournament.start_date,
      format: tournament.format,
      players: decks.map((deck) => ({
        id: deck.id,
        name: deck.username,
        commander: deck.commander,
        partner: deck.partner ? deck.partner : null,
        colors: Array.isArray(deck.color_identity)
          ? deck.color_identity.filter((color) => typeof color === 'string').join('')
          : deck.color_identity.replace(/[^a-zA-Z]/g, ''),
        wins: deck.wins,
        losses: deck.losses,
        draws: deck.draws,
        isWinner: deck.wins,
      })),
    }
  }
  // todo corrigir as datas
  async getTournamentsByDateRange(startDate: string, endDate: string): Promise<TournamentDto[]> {
    const tournaments = await this.tournamentRepository.query(
      `SELECT * FROM tournaments WHERE start_date BETWEEN $1 AND $2`,
      [startDate, endDate]
    );
    return tournaments.map((tournament) => ({
      id: tournament.id,
      start_date: tournament.end_date,
      end_date: tournament.end_date,
      name: tournament.name,
    }));
  }

  async getTournamentsInfoById(id: number): Promise<any> {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: id },
      relations: ["decks"],
    });

    if (!tournament) {
      throw new Error("Tournament not found");
    }

    return {
      id: tournament.id,
      name: tournament.name,
      location: 'none',
      start_date: tournament.start_date,
      format: tournament.format,
      players_number: tournament.decks.length,
      players: tournament.decks.map((deck) => ({
        id: deck.id,
        name: deck.username,
        commander: deck.commander,
        partner: deck.partner ? deck.partner : null,
        colors: Array.isArray(deck.color_identity)
          ? deck.color_identity.filter((color) => typeof color === 'string').join('')
          : deck.color_identity.replace(/[^a-zA-Z]/g, ''),
        wins: deck.wins,
        losses: deck.losses,
        draws: deck.draws,
        isWinner: deck.is_winner,
      })),
    }
  }
}