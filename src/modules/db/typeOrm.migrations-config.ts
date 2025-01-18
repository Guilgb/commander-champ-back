import { ConfigService } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

const configService = new ConfigService();
const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    entities: [__dirname + 'src/modules/db/entities/**'],
    migrations: [__dirname + 'src/modules/db/migrations/*.ts'],
    synchronize: false,
}

export default new DataSource(dataSourceOptions);