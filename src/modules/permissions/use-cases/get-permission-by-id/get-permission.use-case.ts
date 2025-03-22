import { Injectable } from "@nestjs/common";
import { DBPermissionsService } from "modules/db/services/db-permissions.service";
import { GetPermissionByIdDto } from "./dto/get-permission-by-id.dto";

@Injectable()
export class GetPermissionByIdUseCase {
  constructor(
    private readonly dbPermissionsService: DBPermissionsService,
  ) { }

  async execute(input: GetPermissionByIdDto) {
    const { id } = input;
    return await this.dbPermissionsService.findOnePermission(id);
  }
}