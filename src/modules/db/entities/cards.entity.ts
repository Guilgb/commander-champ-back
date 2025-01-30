import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DeckEntity } from './decks.entity';

@Entity('cards')
export class CardsEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(() => DeckEntity, (deck) => deck.cards)
  @JoinColumn({ name: 'deck_id' })
  deck_id: DeckEntity;

  @Column()
  cmc: number;

  @Column()
  type: string;

  @Column("jsonb", { array: true })
  mana_cost: string;

  @Column("jsonb", { array: true })
  colors: string[];

  @Column("jsonb", { array: true })
  color_identity: string[];

  @Column()
  created_at: Date;
}