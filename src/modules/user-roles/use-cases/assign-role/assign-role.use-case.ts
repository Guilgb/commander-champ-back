import { Injectable } from "@nestjs/common";
import { DBUserRolesService } from "modules/db/services/db-user-roles.service";
import { AssignRoleDto } from "./dto/assign-role.dto";

@Injectable()
export class AssignRoleToUserUseCase {
  constructor(
    private readonly dbUserRolesService: DBUserRolesService
  ) { }

  async execute(input: AssignRoleDto) {
    return await this.dbUserRolesService.assignRoleToUser(input);
  }
}