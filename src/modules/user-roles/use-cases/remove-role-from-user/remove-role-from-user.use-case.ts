import { Injectable } from "@nestjs/common";
import { DBUserRolesService } from "modules/db/services/db-user-roles.service";
import { RemoveRoleFromUserDto } from "./dto/remove-role-from-user.dto";

@Injectable()
export class RemoveRoleFromUserUseCase {
  constructor(
    private readonly dbUserRolesService: DBUserRolesService
  ) { }

  async execute(input: RemoveRoleFromUserDto) {
    return await this.dbUserRolesService.removeRoleFromUser(input);
  }
}