export interface DeckDto {
  id?: number;
  username: string;
  deckname: string;
  tournament_id: number;
  wins: number;
  losses: number;
  draws: number;
}