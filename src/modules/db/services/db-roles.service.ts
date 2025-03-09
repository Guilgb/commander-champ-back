import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { IRolesCreate, IRolesUpdate } from "../types/IRoles";
import { RolesEntity } from "../entities/roles.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DBRolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly userRoleRepository: Repository<RolesEntity>
  ) { }

  async createRole(input: IRolesCreate) {
    const role = this.userRoleRepository.create({
      name: input.name,
      description: input.description,
      created_at: new Date(),
      updated_at: new Date()
    });

    const savedRole = await this.userRoleRepository.save(role);
    return {
      ...savedRole,
      created_at: savedRole.created_at.toISOString(),
      updated_at: savedRole.updated_at.toISOString()
    }
  }

  async deleteRole(id: number) {
    const role = await this.userRoleRepository.findOne({ where: { id } });

    if (!role) {
      throw new Error('Role not found');
    }

    await this.userRoleRepository.delete({ id });
    return role;
  }

  async updateRole(input: IRolesUpdate) {
    const { id, name, description, created_at } = input;

    const role = await this.userRoleRepository.findOne({ where: { id } });
    console.log(role)
    if (!role) {
      throw new Error('Role not found');
    }

    const updatedRole = await this.userRoleRepository.update({ id: id }, {
      name: name,
      description: description,
      created_at: created_at,
      updated_at: new Date()
    });

    return {
      ...role,
      ...updatedRole,
      updated_at: updatedRole
    }
  }

  async getRoles() {
    return this.userRoleRepository.find();
  }

  async getRoleById(id: number) {
    return this.userRoleRepository.findOne({ where: { id } });
  }
}