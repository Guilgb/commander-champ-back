import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from 'typeorm';
import { TournamentEntity } from './tournaments.entity';
import { CardsEntity } from './cards.entity';

@Entity('decks')
export class DeckEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  commander!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  partner: string;

  @ManyToOne(() => TournamentEntity, (tournament) => tournament.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tournament_id' })
  tournament_id: TournamentEntity;

  @Column()
  decklist: string;

  @Column({ default: 0 })
  wins: number;

  @Column({ default: 0 })
  losses: number;

  @Column({ default: 0 })
  draws: number;

  @Column({ type: 'boolean', default: false })
  is_winner: boolean;

  @Column({ type: 'int', nullable: true })
  cmc_commander: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  color_identity: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => CardsEntity, (card) => card.id, { cascade: true, onDelete: 'CASCADE' })
  cards: CardsEntity[];
}