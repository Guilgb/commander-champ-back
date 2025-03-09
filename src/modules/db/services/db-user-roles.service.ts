import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "../entities/user.entity";
import { RolesEntity } from "../entities/roles.entity";
import { UserRolesEntity } from "../entities/user-roles.entity";
import { IRemoveUserRolesInput, IUpdateUserRolesInput, IUserRolesInput } from "../types/IUserRoles";

@Injectable()
export class DBUserRolesService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
    @InjectRepository(UserRolesEntity)
    private readonly userRolesRepository: Repository<UserRolesEntity>
  ) { }

  async assignRoleToUser(input: IUserRolesInput) {
    try {
      const { user_id, role_id } = input;
      const user = await this.userRepository.findOne({ where: { id: user_id } });
      const role = await this.rolesRepository.findOne({ where: { id: role_id } });

      const userRole = await this.userRolesRepository.create({
        user_id: user.id,
        role_id: role.id,
        created_at: new Date(),
        updated_at: new Date()
      });

      return await this.userRolesRepository.save(userRole);
    } catch (error) {
      throw new Error(`Error assigning role to user: ${error.message}`);
    }
  }

  async getRolesByUserId(user_id: number) {
    try {
      return await this.userRolesRepository.find({ where: { user_id: user_id } });
    } catch (error) {
      throw new Error(`Error getting roles by user ID: ${error.message}`);
    }
  }

  async getUsersByRoleId(roleId: number) {
    try {
      return await this.userRolesRepository.find({ where: { role_id: roleId } });
    } catch (error) {
      throw new Error(`Error getting users by role ID: ${error.message}`);
    }
  }

  async removeRoleFromUser(input: IRemoveUserRolesInput) {
    try {
      const { user_id, role_id } = input;
      return await this.userRolesRepository.delete({ user_id, role_id });
    } catch (error) {
      throw new Error(`Error removing role from user: ${error.message}`);
    }
  }

  async updateRoleFromUser(input: IUpdateUserRolesInput) {
    const { user_id, role_id, newRole_id } = input;
    try {

      const user = await this.userRepository.findOne({ where: { id: user_id } });

      if (!user) {
        throw new Error('User not found');
      }

      const role = await this.rolesRepository.findOne({ where: { id: newRole_id } });

      if (!role) {
        throw new Error('Role not found');
      }

      await this.userRolesRepository.delete({ user_id, role_id });

      const userRole = await this.userRolesRepository.create({
        user_id: user.id,
        role_id: role.id,
        created_at: new Date(),
        updated_at: new Date()
      });

      return await this.userRolesRepository.save(userRole);
    } catch (error) {
      throw new Error(`Error updating role from user: ${error.message}`);
    }
  }
}