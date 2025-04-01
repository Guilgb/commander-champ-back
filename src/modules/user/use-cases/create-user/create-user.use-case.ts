import { Injectable } from "@nestjs/common";
import { DBUsersService } from "modules/db/services/db-users.service";
import { UsersDto } from "./dto/user.dto";
import { hash } from "bcryptjs";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersService: DBUsersService,
  ) { }

  async execute(input: UsersDto) {
    try {
      const hashedPassword = await hash(input.password, 10);

      const email = await this.usersService.getUserByEmail(input.email);
      if (email) {
        throw new Error("Email already exists");
      }
      // todo upar avatar no s3 e salvar o link no banco
      const user = await this.usersService.createUser({
        email: input.email,
        password: hashedPassword,
        name: input.name,
        avatar: null,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}