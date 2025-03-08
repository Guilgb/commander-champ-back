import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { CreateRoleUseCase } from "./use-cases/create-role/create-role.use-case";
import { UpdateRoleUseCase } from "./use-cases/update-role/update-role.use-case";
import { DeleteRoleUseCase } from "./use-cases/delete-role/delete-role.use-case";
import { GetRoleUseCase } from "./use-cases/get-role/get-role.use-case";
import { CreateRoleDto } from "./use-cases/create-role/dto/create-role.dto";
import { UpdateRoleDto } from "./use-cases/update-role/dto/update-role.dto";

@Controller('/roles')
export class RolesController { 
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
    private readonly getRoleUseCase: GetRoleUseCase,

  ) {}

  @Post('/')
  async createRole(
    @Body() body: CreateRoleDto
  ) {
    return await this.createRoleUseCase.execute(body);
  }

  @Put('/')
  async updateRole(
    @Body() body: UpdateRoleDto
  ) {
    return await this.updateRoleUseCase.execute(body);
  }

  @Get('/')
  async getRole() {
    return await this.getRoleUseCase.execute();
  }

  @Delete('/')
  async deleteRole(
    @Body() body: { id: number }
  ) {
    return await this.deleteRoleUseCase.execute(body);
  }

}