import { Injectable } from "@nestjs/common";
import { DataBaseUsersService } from "src/modules/db/services/db-users.service";
import { UsersDto } from "./dto/user.dto";
import { hash } from "bcryptjs";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersService: DataBaseUsersService,
  ) { }

  async execute(input: UsersDto) {
    try {
      const hashedPassword = await hash(input.password, 10);

      const user = await this.usersService.createUser({
        email: input.email,
        password: hashedPassword,
        name: input.name,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}