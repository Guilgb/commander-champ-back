import { MigrationInterface, QueryRunner } from "typeorm";

export class Decks1737220197690 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
      CREATE TABLE decks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        deckname VARCHAR(255) NOT NULL,
        tournament_id INTEGER NOT NULL,
        wins INTEGER DEFAULT 0,
        losses INTEGER DEFAULT 0,
        draws INTEGER DEFAULT 0,
        CONSTRAINT fk_tournament
            FOREIGN KEY(tournament_id) 
            REFERENCES tournaments(id)
      );  
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE cards`);
  }

}
