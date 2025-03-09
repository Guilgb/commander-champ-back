import { Injectable } from "@nestjs/common";
import { DBRolePermissionsService } from "src/modules/db/services/db-role-permissions.service";
import { GetRolePermissionByPermissionDto } from "./dto/get-role-permission-by-permission.dto";

@Injectable()
export class GetRolePermissionByPermissionUseCase {
  constructor(
    private readonly dbRolePermissionsService: DBRolePermissionsService
  ) { }

  async execute(input: GetRolePermissionByPermissionDto) {
    try {
      const { permission_id } = input;
      return await this.dbRolePermissionsService.getRolePermissionByPermissionId(permission_id);
    } catch (error) {
      throw new Error(`Failed to delete role permission: ${error.message}`);
    }
  }
}