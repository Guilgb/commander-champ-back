export interface DeleteTournamentDto {
  id: number;
}

export interface DecksResponseDto {
  id: number;
  username: string;
  commander: string;
  partner: string | null;
  decklist: string;
  wins: number;
  losses: number;
  draws: number;
  is_winner: boolean;
  cmc_commander: number;
  color_identity: string;
  created_at: string;
}