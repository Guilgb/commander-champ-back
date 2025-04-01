import { DBUserRolesService } from "@modules/db/services/db-user-roles.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetUserAuthenticationByEmailUseCase {
  constructor(
    private readonly dbUserRolesService: DBUserRolesService
  ) { }

  async execute(email: string) {
    const response = await this.dbUserRolesService.getAuthenticationByEmail(email);
    return response;
  }
}
