import { DBUsersService } from "@modules/db/services/db-users.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly dbUsersService: DBUsersService,
  ) {}
  async execute(email: string) {
    return await this.dbUsersService.deleteUserByEmail(email);
  }
}