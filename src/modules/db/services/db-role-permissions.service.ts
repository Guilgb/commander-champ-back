import { Injectable } from "@nestjs/common";
import { RolePermissionsEntity } from "../entities/role-permissions.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IRolePermissions, IRolePermissionnsUpdate, IRolePermissionsDelete } from "../types/IRolePermissions";
import { RolesEntity } from "../entities/roles.entity";
import { PermissionsEntity } from "../entities/permissions.entity";

@Injectable()
export class DBRolePermissionsService {
  constructor(
    @InjectRepository(RolePermissionsEntity)
    private readonly rolePermissionsRepository: Repository<RolePermissionsEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
    @InjectRepository(PermissionsEntity)
    private readonly permissionsRepository: Repository<PermissionsEntity>
  ) { }

  async createRolePermission(input: IRolePermissions): Promise<RolePermissionsEntity> {
    try {
      const { role_id, permission_id } = input;
      const rolePermission = this.rolePermissionsRepository.create({
        role_id: role_id,
        permission_id: permission_id,
        created_at: new Date()
      });

      const savedRolePermission = await this.rolePermissionsRepository.save(rolePermission);
      return savedRolePermission;
    } catch (error) {
      throw new Error(`Failed to create role permission: ${error.message}`);
    }
  }

  async getRolePermissions(): Promise<RolePermissionsEntity[]> {
    try {
      return await this.rolePermissionsRepository.find();
    } catch (error) {
      throw new Error(`Failed to get role permissions: ${error.message}`);
    }
  }

  async getRolePermissionByRoleId(id: number): Promise<RolePermissionsEntity> {
    try {
      return await this.rolePermissionsRepository.findOne({ where: { role_id: id } });
    } catch (error) {
      throw new Error(`Failed to get role permission by role ID: ${error.message}`);
    }
  }

  async getRolePermissionByPermissionId(id: number): Promise<RolePermissionsEntity> {
    try {
      return await this.rolePermissionsRepository.findOne({ where: { permission_id: id } });
    } catch (error) {
      throw new Error(`Failed to get role permission by permission ID: ${error.message}`);
    }
  }

  async deleteRolePermissionByRoleId(input: IRolePermissionsDelete) {
    try {
      const { role_id, permission_id } = input;
      const rolePermission = await this.rolePermissionsRepository.findOne({ where: { role_id, permission_id } });
      if (!rolePermission) {
        return false;
      }

      return await this.rolePermissionsRepository.delete({ role_id, permission_id });
    } catch (error) {
      throw new Error(`Failed to delete role permission: ${error.message}`);
    }
  }

  async updatePermissionRole(input: IRolePermissionnsUpdate) {
    try {
      const { role_id, permission_id, new_role_id, new_permission_id } = input;
      const rolePermission = await this.rolePermissionsRepository.findOne({ where: { role_id, permission_id } });

      if (!rolePermission) {
        throw new Error('Role permission not found');
      }
      const newRoleVerify = await this.rolesRepository.findOneOrFail({ where: { id: new_role_id } });
      const newPermissionVerify = await this.permissionsRepository.findOneOrFail({ where: { id: new_permission_id } });

      if (!newRoleVerify && !newPermissionVerify) {
        throw new Error('Cannot update both role ID and permission ID at the same time');
      }

      await this.rolePermissionsRepository.delete({ role_id, permission_id });

      const updatedRolePermission = this.rolePermissionsRepository.create({
        role_id: new_role_id,
        permission_id: permission_id,
        created_at: new Date()
      });

      return await this.rolePermissionsRepository.save(updatedRolePermission);
    } catch (error) {
      throw new Error(`Failed to update role permission: ${error.message}`);
    }
  }
}
