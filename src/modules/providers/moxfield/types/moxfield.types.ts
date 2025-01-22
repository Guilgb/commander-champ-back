export interface Card {
    id: string;
    name: string;
    cmc: number;
    type: string;
    colors: string[];
    color_indicator: string[];
    color_identity: string[];
}

export interface Commander {
    quantity: number;
    card: Card;
    useCmcOverride: boolean;
    useManaCostOverride: boolean;
    useColorIdentityOverride: boolean;
    excludedFromColor: boolean;
}

export interface Commanders {
    [key: string]: Commander;
}

export interface Mainboard {
    [key: string]: {
        quantity: number;
        card: Card;
        useCmcOverride: boolean;
        useManaCostOverride: boolean;
        useColorIdentityOverride: boolean;
        excludedFromColor: boolean;
    };
}

export interface MoxfieldDeck {
    id: string;
    name: string;
    publicUrl: string;
    commanders: Commanders;
    mainboard: Mainboard;
}