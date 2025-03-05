import { Entity, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { RolesEntity } from './roles.entity';
import { PermissionsEntity } from './permissions.entity';

@Entity('role_permissions')
export class RolePermissionsEntity {
  @PrimaryColumn()
  role_id: number;

  @PrimaryColumn()
  permission_id: number;

  @ManyToOne(() => RolesEntity, role => role.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: RolesEntity;

  @ManyToOne(() => PermissionsEntity, permission => permission.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionsEntity;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}