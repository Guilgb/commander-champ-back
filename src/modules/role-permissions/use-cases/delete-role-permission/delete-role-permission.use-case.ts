import { Injectable } from "@nestjs/common";
import { DeleteRolePermissionsDto } from "./dto/delete-role-permission.dto";
import { DBRolePermissionsService } from "modules/db/services/db-role-permissions.service";

@Injectable()
export class DeleteRolePermissionUseCase {
  constructor(
    private readonly dbRolePermissionsService: DBRolePermissionsService
  ) { }

  async execute(input: DeleteRolePermissionsDto) {
    try {
      return await this.dbRolePermissionsService.deleteRolePermissionByRoleId(input);
    } catch (error) {
      throw new Error(`Failed to delete role permission: ${error.message}`);
    }
  }
}