import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionsEntity } from "../db/entities/permissions.entity";
import { DBPermissionsService } from "../db/services/db-permissions.service";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { PermissionsController } from "./permissions.controller";
import { CreatePermissionUseCase } from "./use-cases/create-permission/create-permission.use-case";
import { DeletePermissionUseCase } from "./use-cases/delete-permission/delete-permission.use-case";
import { GetPermissionByIdUseCase } from "./use-cases/get-permission-by-id/get-permission.use-case";
import { GetPermissionUseCase } from "./use-cases/get-permission/get-permission.use-case";
import { UpdatePermissionUseCase } from "./use-cases/update-permission/update-permission.use-case";

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([PermissionsEntity])
  ],
  controllers: [PermissionsController],
  providers: [
    DBPermissionsService,
    UpdatePermissionUseCase,
    CreatePermissionUseCase,
    DeletePermissionUseCase,
    GetPermissionByIdUseCase,
    GetPermissionUseCase,
  ],
})

export class PermissionModule { }