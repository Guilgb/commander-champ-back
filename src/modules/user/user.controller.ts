import { Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { UsersDto } from "./use-cases/create-user/dto/user.dto";
import { CreateUserUseCase } from "./use-cases/create-user/create-user.use-case";
import { ListUsersUseCase } from "./use-cases/list-users/list-users.use-case";
import { DeleteUserUseCase } from "./use-cases/delete-user/delete-user.use-case";
import { DeleteUserDto } from "./use-cases/delete-user/dto/delete-user.dto";

@Controller('/user')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) { }

  @Post('/')
  async createUser(
    @Body() body: UsersDto
  ) {
    return await this.createUserUseCase.execute(body);
  }

  @Get('/list')
  async listUsers() {
    return await this.listUsersUseCase.execute();
  }

  @Delete('/')
  async deleteUser(
    @Body() body: DeleteUserDto
  ) {
    return await this.deleteUserUseCase.execute(body.email);
  }
}