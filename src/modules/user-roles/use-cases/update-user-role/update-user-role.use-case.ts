import { Injectable } from "@nestjs/common";
import { DBUserRolesService } from "modules/db/services/db-user-roles.service";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";

@Injectable()
export class UpdateUserRoleUseCase {
  constructor(
    private readonly dbUserRolesService: DBUserRolesService
  ) { }

  async execute(input: UpdateUserRoleDto) {
    const { user_id, role_name, new_role_name } = input.data;
    return await this.dbUserRolesService.updateRoleFromUser(
      {
        user_id,
        role_name,
        new_role_name
      }
    );
  }
}