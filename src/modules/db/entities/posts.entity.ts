import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsersEntity } from './user.entity';
import { TopicsEntity } from './topics.entity';

@Entity('posts')
export class PostsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UsersEntity, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => TopicsEntity, topic => topic.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topic_id' })
  topic: TopicsEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}