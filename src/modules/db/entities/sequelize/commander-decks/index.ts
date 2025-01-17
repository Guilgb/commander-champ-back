import { initializeCardModel } from "./cards.entity";
import { initializeDeckModel } from "./decks.entity";
import { initializeTournamentModel } from "./tournaments.entity";

export const sequelizePostgresEntities = [
    initializeCardModel,
    initializeDeckModel,
    initializeTournamentModel,
];