import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersDto } from "./use-cases/create-user/dto/user.dto";
import { CreateUserUseCase } from "./use-cases/create-user/create-user.use-case";
import { ListUsersUseCase } from "./use-cases/list-users/list-users.use-case";

@Controller('/user')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
  ) { }

  @Post('/')
  async createUser(
    @Body() body: UsersDto
  ) {
    return await this.createUserUseCase.execute(body);
  }

  @Get('/')
  async listUsers() {
    return await this.listUsersUseCase.execute();
  }
}