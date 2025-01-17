import { Options, Sequelize } from "sequelize";
import { sequelizePostgresEntities } from "./entities/sequelize/commander-decks";

let sequelize: Sequelize | null

const createConfig = (database: string): Options => ({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database,
});

export const getDatabaseConnection = (database: string): Sequelize => {
  if (!sequelize) {
    sequelize = new Sequelize(createConfig(database));
  }

  sequelizePostgresEntities.forEach((initModel) => initModel(sequelize));

  return sequelize;
};

export const databaseProvider = [
  {
    provide: "COMMANDER_DECKS",
    useFactory: () => getDatabaseConnection(process.env.DB_NAME),
  },
]
