import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { IRoles } from "../types/IRoles";
import { RolesEntity } from "../entities/roles.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class DbRolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly userRoleRepository: Repository<RolesEntity>
  ) { }

  async createRole(input: IRoles) {
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

  async updateRole(id: number, input: IRoles) {
    const role = await this.userRoleRepository.findOne({ where: { id } });
    if (!role) {
      throw new Error('Role not found');
    }

    const updatedRole = await this.userRoleRepository.update({ id: id}, {
      name: input.name,
      description: input.description,
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
}