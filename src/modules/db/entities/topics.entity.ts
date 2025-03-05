import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from './user.entity';
import { CategoriesEntity } from './categories.entity';

@Entity('topics')
export class TopicsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UsersEntity, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => CategoriesEntity, category => category.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: CategoriesEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}