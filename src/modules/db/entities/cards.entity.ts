import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DeckEntity } from './decks.entity';

@Entity('cards')
export class CardsEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(() => DeckEntity, (deck) => deck.id)
  deck_id: number;

  @Column()
  cmc: number;

  @Column()
  type: string;

  @Column()
  mana_cost: string;

  @Column()
  colors: string[];

  @Column()
  color_identity: string[];
}