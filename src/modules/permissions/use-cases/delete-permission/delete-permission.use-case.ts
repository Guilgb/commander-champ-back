import { Injectable } from "@nestjs/common";
import { DeletePermissionDto } from "./dto/delete-permission.dto";
import { DBPermissionsService } from "src/modules/db/services/db-permissions.service";

@Injectable()
export class DeletePermissionUseCase {
  constructor(
    private readonly dbPermissionsService: DBPermissionsService,
  ) { }

  async execute(input: DeletePermissionDto) {
    const { id } = input;
    return await this.dbPermissionsService.deletePermission(id);
  }
}