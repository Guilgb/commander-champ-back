import { MigrationInterface, QueryRunner } from "typeorm";

export class Cards1737220338293 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE cards (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        deck_id INTEGER NOT NULL,
        cmc INTEGER NOT NULL,
        type VARCHAR(255) NOT NULL,
        mana_cost VARCHAR(255) NOT NULL,
        colors VARCHAR(255)[] NOT NULL,
        color_identity VARCHAR(255)[] NOT NULL,
        CONSTRAINT fk_deck
            FOREIGN KEY(deck_id) 
            REFERENCES decks(id)
      );`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE cards`);
  }

}
