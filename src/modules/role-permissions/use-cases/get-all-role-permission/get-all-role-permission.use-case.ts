import { Injectable } from "@nestjs/common";
import { DBRolePermissionsService } from "src/modules/db/services/db-role-permissions.service";

@Injectable()
export class GetAllRolePermissionUseCase {
  constructor(
    private readonly dbRolePermissionsService: DBRolePermissionsService
  ) { }

  async execute() {
    try {
      return await this.dbRolePermissionsService.getRolePermissions();
    } catch (error) {
      throw new Error(`Failed to delete role permission: ${error.message}`);
    }
  }
}