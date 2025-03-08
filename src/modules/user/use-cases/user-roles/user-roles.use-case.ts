import { Injectable } from "@nestjs/common";
import { DataBaseUsersService } from "src/modules/db/services/db-users.service";

@Injectable()
export class UserRoles {
  constructor(
    private readonly usersService: DataBaseUsersService,
  ) { }

  async execute() {
    try {
      return
    } catch (error) {
      throw new Error(error.message);
    }
  }
}