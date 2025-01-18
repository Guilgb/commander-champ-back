import { MigrationInterface, QueryRunner } from "typeorm";

export class Tournaments1737220344985 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE tournaments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        format VARCHAR(255) NOT NULL CHECK (format IN ('c500', 'cedh', 'casual', 'conquest'))
      );
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE tournaments`);
  }

}
