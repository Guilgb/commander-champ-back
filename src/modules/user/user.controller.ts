import { Body, Controller, Post } from "@nestjs/common";
import { UsersDto } from "./use-cases/create-user/dto/user.dto";
import { CreateUserUseCase } from "./use-cases/create-user/create-user.use-case";

@Controller('/user')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase
  ) { }

  @Post('/')
  async createUser(
    @Body() body: UsersDto
  ) {
    return await this.createUserUseCase.execute(body);
  }
}