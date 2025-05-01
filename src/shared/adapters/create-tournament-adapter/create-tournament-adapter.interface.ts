import { CreateTournamentAdapterDto } from "./implementation/create-tournament-adapter.dto";

export interface CreateTournamentAdapterInterface {
  createTournament(tournament: CreateTournamentAdapterDto): Promise<any>;
}