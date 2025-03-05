import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { UsersEntity } from './user.entity';
import { RolesEntity } from './roles.entity';

@Entity('user_roles')
export class UserRolesEntity {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  role_id: number;

  @ManyToOne(() => UsersEntity, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UsersEntity;

  @ManyToOne(() => RolesEntity, role => role.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}