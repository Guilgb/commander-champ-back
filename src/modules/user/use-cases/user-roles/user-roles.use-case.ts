import { Injectable } from "@nestjs/common";
import { DBUsersService } from "src/modules/db/services/db-users.service";

@Injectable()
export class UserRoles {
  constructor(
    private readonly usersService: DBUsersService,
  ) { }

  async execute() {
    try {
      return
    } catch (error) {
      throw new Error(error.message);
    }
  }
}