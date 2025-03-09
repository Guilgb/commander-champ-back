import { Injectable } from "@nestjs/common";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { DBPermissionsService } from "src/modules/db/services/db-permissions.service";

@Injectable()
export class UpdatePermissionUseCase {
  constructor(
    private readonly dbPermissionsService: DBPermissionsService,
  ) { }

  async execute(input: UpdatePermissionDto) {
    return await this.dbPermissionsService.updatePermission(input);
  }
}