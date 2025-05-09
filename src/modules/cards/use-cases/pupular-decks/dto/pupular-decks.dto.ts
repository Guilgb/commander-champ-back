export interface PopularDecksInput {
  card_name: string;
}

export interface PopularDecksOutput {
  id: number;
  commander: string;
  partner: string | null;
  wins: number;
  losses: number;
  draws: number;
  color_identity: string;
  decks_count: number;
};