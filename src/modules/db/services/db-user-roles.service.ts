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
    const { user_id, role_name, new_role_name } = input;
    try {

      const user = await this.userRepository.findOne({ where: { id: user_id } });

      if (!user) {
        throw new Error('User not found');
      }

      const role = await this.rolesRepository.findOneBy({ name: role_name });

      if (!role) {
        throw new Error('Role not found');
      }

      const newRole = await this.rolesRepository.findOneBy({ name: new_role_name });

      if (!newRole) {
        throw new Error('New role not found');
      }

      const delete_user_role = await this.userRolesRepository.delete({ user_id, role_id: role.id });

      const userRole = await this.userRolesRepository.create({
        user_id: user.id,
        role_id: newRole.id,
        created_at: new Date(),
        updated_at: new Date()
      });

      return await this.userRolesRepository.save(userRole);
    } catch (error) {
      throw new Error(`Error updating role from user: ${error.message}`);
    }
  }

  async getAuthenticationByEmail(email: string) {
    try {
      const userquery = await this.userRepository.createQueryBuilder('u')
        .select(['u.id AS id', 'u.email AS email', 'u.name AS name', 'r.name AS role'])
        .innerJoin('user_roles', 'ur', 'u.id = ur.user_id')
        .innerJoin('roles', 'r', 'ur.role_id = r.id')
        .where('(u.email = :email)', { email })
        .getRawOne();

      return {
        id: userquery.id,
        name: userquery.name,
        email: userquery.email,
        role: userquery.role
      };

    } catch (error) {
      throw new Error(`Error getting authentication: ${error.message}`);
    }
  }

  async listUsers() {
    try {
      const userquery = await this.userRepository.createQueryBuilder('u')
        .select(['u.id AS id', 'u.name AS name', 'u.email AS email', 'r.name AS role', 'u.created_at AS created_at'])
        .innerJoin('user_roles', 'ur', 'u.id = ur.user_id')
        .innerJoin('roles', 'r', 'ur.role_id = r.id')
        .getRawMany();

      return userquery
    } catch (error) {
      throw new Error(`Error getting authentication: ${error.message}`);
    }
  }
}