import { Controller } from "@nestjs/common";
import { RemoveRoleFromUserUseCase } from "./use-cases/remove-role-from-user/remove-role-from-user.use-case";
import { GetRolesByUserUseCase } from "./use-cases/get-roles-by-user/get-roles-by-user.use-case";
import { UpdateUserRoleUseCase } from "./use-cases/update-user-role/update-user-role.use-case";
import { AssignRoleToUserUseCase } from "./use-cases/assign-role/assign-role.use-case";
import { Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RemoveRoleFromUserDto } from "./use-cases/remove-role-from-user/dto/remove-role-from-user.dto";
import { AssignRoleDto } from "./use-cases/assign-role/dto/assign-role.dto";
import { UpdateUserRoleDto } from "./use-cases/update-user-role/dto/update-user-role.dto";
import { GetRolesByUserDto } from "./use-cases/get-roles-by-user/dto/get-roles-by-user.dto";
import { GetUsersByRoleDto } from "./use-cases/get-users-by-role/dto/get-users-by-role.dto";
import { GetUsersByRoleUseCase } from "./use-cases/get-users-by-role/get-users-by-role.use-case";

@Controller("/user-roles")
export class UserRoleController {
  constructor(
    private readonly assignRoleUseCase: AssignRoleToUserUseCase,
    private readonly removeRoleFromUserUseCase: RemoveRoleFromUserUseCase,
    private readonly getRolesByUserUseCase: GetRolesByUserUseCase,
    private readonly getRolesByRoleUseCase: GetUsersByRoleUseCase,
    private readonly updateUserRoleUseCase: UpdateUserRoleUseCase
  ) { }

  @Post("/assign")
  async assignRole(@Body() input: AssignRoleDto) {
    return await this.assignRoleUseCase.execute(input);
  }

  @Delete("/remove")
  async removeRole(
    @Body() input: RemoveRoleFromUserDto
  ) {
    return await this.removeRoleFromUserUseCase.execute(input);
  }

  @Get("/user")
  async getRolesByUser(
    @Body() input: GetRolesByUserDto
  ) {
    const { user_id } = input;
    return await this.getRolesByUserUseCase.execute(user_id);
  }

  @Get("/role")
  async getUserByRole(
    @Body() input: GetUsersByRoleDto
  ) {
    const { role_id } = input;
    return await this.getRolesByRoleUseCase.execute(role_id);
  }

  @Put("/update")
  async updateUserRole(
    @Body() input: UpdateUserRoleDto
  ) {
    return await this.updateUserRoleUseCase.execute(input);
  }
}