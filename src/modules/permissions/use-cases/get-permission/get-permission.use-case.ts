import { Injectable } from "@nestjs/common";
import { DBPermissionsService } from "modules/db/services/db-permissions.service";

@Injectable()
export class GetPermissionUseCase {
  constructor(
    private readonly dbPermissionsService: DBPermissionsService,
  ) { }

  async execute() {
    return await this.dbPermissionsService.findAllPermission();
  }
}