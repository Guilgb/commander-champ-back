import { Injectable } from "@nestjs/common";
import { UpdatePermissionDto } from "./dto/get-permission.dto";
import { DBPermissionsService } from "src/modules/db/services/db-permissions.service";

@Injectable()
export class GetPermissionUseCase {
  constructor(
    private readonly dbPermissionsService: DBPermissionsService,
  ) { }

  async execute() {
    return await this.dbPermissionsService.findAllPermission();
  }
}