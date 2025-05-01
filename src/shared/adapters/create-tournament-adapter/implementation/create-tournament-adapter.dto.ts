export interface CreateTournamentAdapterDto {
  name: string;
  start_date: Date;
  end_date: Date;
  format: string;
  user_id: number;
  online: boolean;
  link: string;
  type: string;
  registration_mode: string;
  rounds: number;
}