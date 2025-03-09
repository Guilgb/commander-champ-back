import { Controller } from "@nestjs/common";
import { GetAllRolePermissionUseCase } from "./use-cases/get-all-role-permission/get-all-role-permission.use-case";
import { GetRolePermissionByPermissionUseCase } from "./use-cases/get-role-permission-by-permission/get-role-permission-by-permission.use-case";
import { CreateRolePermissionUseCase } from "./use-cases/create-role-permission/create-role-permission.use-case";
import { UpdateRolePermissionUseCase } from "./use-cases/update-role-permission/update-role-permission.use-case";
import { DeleteRolePermissionUseCase } from "./use-cases/delete-role-permission/delete-role-permission.use-case";
import { GetRolePermissionByRoleUseCase } from "./use-cases/get-role-permission-by-role/get-role-permission-by-role.use-case";
import { Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { GetRolePermissionByRoleDto } from "./use-cases/get-role-permission-by-role/dto/get-role-permission-by-role.dto";
import { GetRolePermissionByPermissionDto } from "./use-cases/get-role-permission-by-permission/dto/get-role-permission-by-permission.dto";
import { CreateRolePermissionDto } from "./use-cases/create-role-permission/dto/create-role-permission.dto";
import { RolePermissionnsUpdateDto } from "./use-cases/update-role-permission/dto/update-role-permission.dto";
import { DeleteRolePermissionsDto } from "./use-cases/delete-role-permission/dto/delete-role-permission.dto";

@Controller("/role-permissions")
export class RolePermissionsController {
  constructor(
    private readonly getAllRolePermissionUseCase: GetAllRolePermissionUseCase,
    private readonly getRolePermissionByPermissionUseCase: GetRolePermissionByPermissionUseCase,
    private readonly getRolePermissionByRoleUseCase: GetRolePermissionByRoleUseCase,
    private readonly createRolePermissionUseCase: CreateRolePermissionUseCase,
    private readonly updateRolePermissionUseCase: UpdateRolePermissionUseCase,
    private readonly deleteRolePermissionUseCase: DeleteRolePermissionUseCase
  ) { }

  @Post()
  async createRolePermission(
    @Body() input: CreateRolePermissionDto
  ) {
    return this.createRolePermissionUseCase.execute(input);
  }

  @Get()
  async getAllRolePermission() {
    return this.getAllRolePermissionUseCase.execute();
  }

  @Get('/role_id')
  async getRolePermissionByRole(
    @Body() input: GetRolePermissionByRoleDto
  ) {
    return this.getRolePermissionByRoleUseCase.execute(input);
  }

  @Get('/permission_id')
  async getRolePermissionByPermission(
    @Body() input: GetRolePermissionByPermissionDto
  ) {
    return this.getRolePermissionByPermissionUseCase.execute(input);
  }

  @Put()
  async updateRolePermission(
    @Body() input: RolePermissionnsUpdateDto
  ) {
    return this.updateRolePermissionUseCase.execute(input);
  }

  @Delete()
  async deleteRolePermission(
    @Body() input: DeleteRolePermissionsDto
  ) {
    return this.deleteRolePermissionUseCase.execute(input);
  }
}