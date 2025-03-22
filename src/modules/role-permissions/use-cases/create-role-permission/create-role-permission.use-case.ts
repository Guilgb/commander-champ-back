import { Injectable } from "@nestjs/common";
import { DBRolePermissionsService } from "modules/db/services/db-role-permissions.service";
import { CreateRolePermissionDto } from "./dto/create-role-permission.dto";

@Injectable()
export class CreateRolePermissionUseCase {
  constructor(
    private readonly dbRolePermissionsService: DBRolePermissionsService,
  ) { }

  async execute(input: CreateRolePermissionDto) {
    return await this.dbRolePermissionsService.createRolePermission(input);
  }
}