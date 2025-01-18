import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TournamentEntity } from './tournaments.entity';

@Entity('decks')
export class DeckEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  deckname!: string;

  @Column()
  tournament_id!: number;

  @Column({ default: 0 })
  wins!: number;

  @Column({ default: 0 })
  losses!: number;

  @Column({ default: 0 })
  draws!: number;

  @ManyToOne(() => TournamentEntity, tournament => tournament.id)
  tournament!: TournamentEntity;
}