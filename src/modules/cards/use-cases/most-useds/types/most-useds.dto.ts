export interface MostUsedsDto {
  name?: string;
  cmc?: number;
  type?: string;
  mana_cost?: string;
  colors?: string[];
  color_identity?: string[];
  deck_id?: number;
  tournament_id?: number;
}