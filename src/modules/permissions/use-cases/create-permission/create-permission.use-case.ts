import { Injectable } from "@nestjs/common";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { DBPermissionsService } from "modules/db/services/db-permissions.service";

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    private readonly dbPermissionsService: DBPermissionsService,
  ) { }

  async execute(input: CreatePermissionDto) {
    return await this.dbPermissionsService.createPermission(input);
  }
}