export interface CreateTournamentDto {
    id?: number;
    name: string;
    start_date: Date;
    end_date: Date;
    format: string;
  }