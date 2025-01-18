import { DataSource, EntityManager } from "typeorm";
import { entitiesList } from "../../modules/db/entities/index";

let dataSource: DataSource;
const getDatabaseConnection = async (): Promise<EntityManager> => {
  if (dataSource && dataSource.isInitialized) {
    return dataSource.manager;
  } else {
    dataSource = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        ...entitiesList
      ],
      synchronize: true
    });
    return await dataSource
      .initialize()
      .then(() => {
        console.log("Database connection established");
        return dataSource.manager;
      })
      .catch((error) => {
        console.error("Failed to establish database connection", error);
        throw new Error("Failed to establish database connection");
      });
  }
};
const getDataSource = (): DataSource => {
  if (dataSource && dataSource.isInitialized) return dataSource;
  else throw new Error("No DB Connection Found!");
};

async function closeDatabaseConnection(): Promise<void> {
  try {
    if (dataSource && dataSource.isInitialized) {
      await dataSource.destroy();
      console.log("Connection Closed!");
    }
  } catch (err) {
    console.log(err);
  }
}

export { getDatabaseConnection, closeDatabaseConnection, getDataSource };