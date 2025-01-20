
export interface CardsDto {
  id?: number;
  name: string;
  deck_id: number;
  cmc: number;
  type: string;
  mana_cost: string;
  colors: string[];
  color_identity: string[];
}
