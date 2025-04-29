export interface DeckDto {
  id?: number;
  username: string;
  decklist: string;
  tournament_id: number;
  wins: number;
  losses: number;
  draws: number;
  commander: string;
  partner?: string;
  color_identity: string;
  cmc_commander: number;
  is_winner: boolean;
}