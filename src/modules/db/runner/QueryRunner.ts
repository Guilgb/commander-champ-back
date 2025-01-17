import { IQueryRunner } from "./IQueryRunner";
import { QueryTypes, Sequelize } from "sequelize";

export class QueryRunner implements IQueryRunner {
  constructor(private readonly pool: Sequelize) {}

  async query<T>(sql: string, values: any[]): Promise<T[]> {
    const [rows] = await this.pool.query(sql, {
      replacements: values,
      type: QueryTypes.RAW,
    });

    return rows as T[];
  }

  async queryOne<T>(sql: string, values: any[]): Promise<T> {
    const [row] = await this.pool.query(sql, {
      replacements: values,
      type: QueryTypes.RAW,
    });

    return row as T;
  }
}
