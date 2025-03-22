import { Injectable } from "@nestjs/common";
import { DBRolesService } from "modules/db/services/db-roles.service";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    private readonly rolesService: DBRolesService,
  ) { }

  async execute(input: UpdateRoleDto) {
    try {

      const role = await this.rolesService.updateRole(input);

      if (!role) {
        throw new Error('Role not found');
      }

      return await this.rolesService.updateRole(input);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}