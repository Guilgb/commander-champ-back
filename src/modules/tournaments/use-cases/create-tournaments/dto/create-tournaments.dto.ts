export interface CreateTournamentDto {
  id?: number;
  name: string;
  start_date: Date;
  end_date: Date;
  format: string;
  user_id: number;
  online: boolean;
  link: string;
  type: string;
}

export interface Card {
  name: string;
  cmc: number;
  type: string;
  mana_cost: string;
  colors: string[];
  color_identity: string[];
}

export interface NormalizedDeck {
  name: string;
  card: Card;
}