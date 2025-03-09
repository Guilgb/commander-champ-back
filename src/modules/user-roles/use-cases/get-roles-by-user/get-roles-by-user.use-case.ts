import { Injectable } from "@nestjs/common";
import { DBUserRolesService } from "src/modules/db/services/db-user-roles.service";

@Injectable()
export class GetRolesByUserUseCase {
  constructor(
    private readonly dbUserRolesService: DBUserRolesService
  ) { }

  async execute(user_id: number) {
    return await this.dbUserRolesService.getRolesByUserId(user_id);
  }
}