import { DBUserRolesService } from "@modules/db/services/db-user-roles.service";
import { DBUsersService } from "@modules/db/services/db-users.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListUsersUseCase {
  constructor(
    private readonly dbUserRolesService: DBUserRolesService,
  ) { }

  async execute() {
    try {
      const users = await this.dbUserRolesService.listUsers();
      return users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          created_at: user.created_at.toLocaleDateString("pt-BR")
        };
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}