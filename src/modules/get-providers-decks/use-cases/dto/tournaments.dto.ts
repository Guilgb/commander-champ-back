export interface TournamentDto {
  id?: number;
  name: string;
  start_date: Date;
  end_date: Date;
  format: string;
  user_id: number;
  online: boolean;
  tournament_link: string;
}