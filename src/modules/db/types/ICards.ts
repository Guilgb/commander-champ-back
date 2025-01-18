export type ICard = {
    id: string;
    deck_id: string;
    name: string;
    cmc: string;
    type: string;
    mana_cost: string;
    colors: string[];
    color_identity: string[];
}