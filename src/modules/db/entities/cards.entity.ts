import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeckEntity } from './decks.entity';

@Entity('cards')
export class CardsEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @ManyToOne(() => DeckEntity, (deck) => deck.cards)
  @JoinColumn({ name: 'deck_id' })
  deck_id: DeckEntity;

  @Column({ type: 'int' })
  cmc: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  mana_cost: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  colors: string[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  color_identity: string[];

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;
}