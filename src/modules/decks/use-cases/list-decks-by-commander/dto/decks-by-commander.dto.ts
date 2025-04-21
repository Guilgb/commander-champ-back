export interface ListDecksByCommandeInput {
  commander_name: string;
  partner_name: string;
}

export interface DeckByCommanderResponse {
  id: number;
  username: string;
  commander: string;
  partner: string | null;
  wins: number;
  losses: number;
  draws: number;
  color_identity: string;
}