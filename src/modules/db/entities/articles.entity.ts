import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from './user.entity';
import { TopicsEntity } from './topics.entity';

@Entity('articles')
export class ArticlesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UsersEntity, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user_id: UsersEntity;

  @ManyToOne(() => TopicsEntity, topic => topic.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topic_id' })
  topic_id: TopicsEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'varchar' })
  excerpt: string;

  @Column({ type: 'varchar' })
  read_time: string;

  @Column({ type: 'int' })
  views: number;

  @Column({ type: 'int' })
  comments: number;

  @Column({ type: 'bool' })
  featured: boolean;
  
  @Column({ type: 'varchar' })
  cover_image: string;

  @Column({ type: 'varchar' })
  tags: string;
}