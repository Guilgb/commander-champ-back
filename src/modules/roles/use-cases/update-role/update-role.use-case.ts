import { Injectable } from "@nestjs/common";
import { DbRolesService } from "src/modules/db/services/db-roles.service";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    private readonly rolesService: DbRolesService,
  ) { }

  async execute(input: UpdateRoleDto) {
    try {
      const role = await this.rolesService.getRoleById(input.id);
      
      if (!role) {
        throw new Error('Role not found');
      }

      return await this.rolesService.updateRole(input);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}