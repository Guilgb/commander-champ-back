import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { GetPermissionUseCase } from "./use-cases/get-permission/get-permission.use-case";
import { UpdatePermissionUseCase } from "./use-cases/update-permission/update-permission.use-case";
import { CreatePermissionUseCase } from "./use-cases/create-permission/create-permission.use-case";
import { DeletePermissionUseCase } from "./use-cases/delete-permission/delete-permission.use-case";
import { CreatePermissionDto } from "./use-cases/create-permission/dto/create-permission.dto";
import { UpdatePermissionDto } from "./use-cases/get-permission/dto/get-permission.dto";
import { DeletePermissionDto } from "./use-cases/delete-permission/dto/delete-permission.dto";
import { GetPermissionByIdUseCase } from "./use-cases/get-permission-by-id/get-permission.use-case";
import { GetPermissionByIdDto } from "./use-cases/get-permission-by-id/dto/get-permission-by-id.dto";

@Controller("/permissions")
export class PermissionsController {
  permissionsService: any;
  constructor(
    private readonly getPermissionUseCase: GetPermissionUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
    private readonly getPermissionByIdUseCase: GetPermissionByIdUseCase,

  ) { }

  @Post()
  async create(
    @Body() createPermissionDto: CreatePermissionDto) {
    return await this.createPermissionUseCase.execute(createPermissionDto);
  }

  @Get()
  async findAll() {
    return await this.getPermissionUseCase.execute();
  }

  @Get("/id")
  async findOne(
    @Body() input: GetPermissionByIdDto) {
    return await this.getPermissionByIdUseCase.execute(input);
  }

  @Put()
  async update(
    @Body() input: UpdatePermissionDto) {
    return await this.updatePermissionUseCase.execute(input);
  }

  @Delete()
  async delete(
    @Body() input: DeletePermissionDto) {
    return await this.deletePermissionUseCase.execute(input);
  }
}
