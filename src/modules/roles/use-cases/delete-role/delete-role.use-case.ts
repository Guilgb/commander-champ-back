import { Injectable } from "@nestjs/common";
import { DBRolesService } from "src/modules/db/services/db-roles.service";
import { DeleteRoleDto } from "./dto/delete-role.dto";

@Injectable()
export class DeleteRoleUseCase {
  constructor(
    private readonly rolesService: DBRolesService,
  ) { }

  async execute(input: DeleteRoleDto) {
    try {
      const role = await this.rolesService.deleteRole(input.id);
      return role;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}