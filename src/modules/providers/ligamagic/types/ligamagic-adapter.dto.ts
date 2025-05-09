export interface CardDetails {
  name: string;
  mana_cost: number;
  colors: string[];
  color_identity: string[];
  type: CardType | number;
  error?: string;
}

export enum CardType {
  Unknown = 0,
  Battle = 1,
  Planeswalker = 2,
  Creature = 3,
  Sorcery = 4,
  Instant = 5,
  Artifact = 6,
  Enchantment = 7,
  Land = 8
}
