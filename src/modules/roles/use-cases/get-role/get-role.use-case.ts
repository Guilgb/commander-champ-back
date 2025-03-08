import { Injectable } from "@nestjs/common";
import { DbRolesService } from "src/modules/db/services/db-roles.service";

@Injectable()
export class GetRoleUseCase {
  constructor(
    private readonly rolesService: DbRolesService,
  ) { }

  async execute() {
    try {
      const role = await this.rolesService.getRoles();
      return role;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}