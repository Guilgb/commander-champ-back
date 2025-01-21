import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { TournamentEntity } from './tournaments.entity';
import { CardsEntity } from './cards.entity';

@Entity('decks')
export class DeckEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  decklist!: string;

  @Column()
  username: string;

  @Column()
  tournament_id!: number;

  @Column({ default: 0 })
  wins!: number;

  @Column({ default: 0 })
  losses!: number;

  @Column({ default: 0 })
  draws!: number;

  @Column()
  commander!: string;

  @Column()
  partner: string;

  @Column()
  color_identity: string;

  @OneToMany(() => CardsEntity, (card) => card.id)
  cards: CardsEntity[];
}