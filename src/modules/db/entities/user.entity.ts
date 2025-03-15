import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TournamentEntity } from './tournaments.entity';

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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}