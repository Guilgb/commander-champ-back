import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from '../db/entities/roles.entity';
import { DBRolePermissionsService } from '../db/services/db-role-permissions.service';
import { PermissionsEntity } from '../db/entities/permissions.entity';
import { RolePermissionsEntity } from '../db/entities/role-permissions.entity';
import { RolePermissionsController } from './role-permissions.controller';
import { UpdateRolePermissionUseCase } from './use-cases/update-role-permission/update-role-permission.use-case';
import { DeleteRolePermissionUseCase } from './use-cases/delete-role-permission/delete-role-permission.use-case';
import { CreateRolePermissionUseCase } from './use-cases/create-role-permission/create-role-permission.use-case';
import { GetRolePermissionByRoleUseCase } from './use-cases/get-role-permission-by-role/get-role-permission-by-role.use-case';
import { GetRolePermissionByPermissionUseCase } from './use-cases/get-role-permission-by-permission/get-role-permission-by-permission.use-case';
import { GetAllRolePermissionUseCase } from './use-cases/get-all-role-permission/get-all-role-permission.use-case';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([RolesEntity, PermissionsEntity, RolePermissionsEntity])
  ],
  controllers: [RolePermissionsController],
  providers: [
    DBRolePermissionsService,
    GetRolePermissionByPermissionUseCase,
    GetRolePermissionByRoleUseCase,
    CreateRolePermissionUseCase,
    UpdateRolePermissionUseCase,
    DeleteRolePermissionUseCase,
    GetAllRolePermissionUseCase,
  ],
})

export class RolePermissionsModule { }