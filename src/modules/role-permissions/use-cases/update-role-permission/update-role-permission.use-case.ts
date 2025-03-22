import { Injectable } from "@nestjs/common";
import { DBRolePermissionsService } from "modules/db/services/db-role-permissions.service";
import { RolePermissionnsUpdateDto } from "./dto/update-role-permission.dto";

@Injectable()
export class UpdateRolePermissionUseCase {
  constructor(
    private readonly dbRolePermissionsService: DBRolePermissionsService
  ) { }

  async execute(input: RolePermissionnsUpdateDto) {
    try {
      return await this.dbRolePermissionsService.updatePermissionRole(input);
    } catch (error) {
      throw new Error(`Failed to delete role permission: ${error.message}`);
    }
  }
}