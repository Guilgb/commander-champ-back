export interface UpdateAllDecksInput {
  format: string;
  id: string;
  location: string;
  name: string;
  players: Decks[];
  start_date: string;
}

interface Decks {
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
  is_winner: boolean;
}