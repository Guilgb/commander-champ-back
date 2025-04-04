export interface UpdateAllDecksDto {
  id: number;
  username: string;
  decklist: string;
  tournament_id: number;
  wins: number;
  losses: number;
  draws: number;
  commander: string;
  partner?: string;
  color_identity: string;
}