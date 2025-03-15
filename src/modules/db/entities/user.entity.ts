import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TournamentEntity } from './tournaments.entity';
import { CommentsEntity } from './comments.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  password: string;
  
  @Column()
  email: string;

  @OneToMany(() => TournamentEntity, (tournament) => tournament.user_id)
  tournaments: TournamentEntity[];

  @OneToMany(() => CommentsEntity, comment => comment.user)
  comments: CommentsEntity[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}