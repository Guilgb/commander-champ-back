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

export interface LoadDecksinput {
  tournament_id: number;
}