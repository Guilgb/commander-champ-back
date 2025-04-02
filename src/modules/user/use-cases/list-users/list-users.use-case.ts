import { DBUsersService } from "@modules/db/services/db-users.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListUsersUseCase {
  constructor(
    private readonly dbUserService: DBUsersService,
  ) { }

  async execute() {
    try {
      const users = await this.dbUserService.listUsers();
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}