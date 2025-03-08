import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}