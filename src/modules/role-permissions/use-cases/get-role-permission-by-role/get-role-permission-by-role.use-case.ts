import { Injectable } from "@nestjs/common";
import { DBRolePermissionsService } from "src/modules/db/services/db-role-permissions.service";
import { GetRolePermissionByRoleDto } from "./dto/get-role-permission-by-role.dto";

@Injectable()
export class GetRolePermissionByRoleUseCase {
  constructor(
    private readonly dbRolePermissionsService: DBRolePermissionsService
  ) { }

  async execute(input: GetRolePermissionByRoleDto) {
    try {
      const { role_id } = input;
      return await this.dbRolePermissionsService.getRolePermissionByRoleId(role_id);
    } catch (error) {
      throw new Error(`Failed to delete role permission: ${error.message}`);
    }
  }
}