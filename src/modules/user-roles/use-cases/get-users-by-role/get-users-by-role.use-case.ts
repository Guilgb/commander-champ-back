import { Injectable } from "@nestjs/common";
import { DBUserRolesService } from "modules/db/services/db-user-roles.service";

@Injectable()
export class GetUsersByRoleUseCase {
  constructor(
    private readonly dbUserRolesService: DBUserRolesService
  ) { }

  async execute(role_id: number) {
    return await this.dbUserRolesService.getUsersByRoleId(role_id);
  }
}