import { Injectable } from "@nestjs/common";
import { DBUserRolesService } from "modules/db/services/db-user-roles.service";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";

@Injectable()
export class UpdateUserRoleUseCase {
  constructor(
    private readonly dbUserRolesService: DBUserRolesService
  ) { }

  async execute(input: UpdateUserRoleDto) {
    return await this.dbUserRolesService.updateRoleFromUser(input);
  }
}