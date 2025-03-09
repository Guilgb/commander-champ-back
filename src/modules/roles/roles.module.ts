import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from '../db/entities/roles.entity';
import { RolesController } from './roles.controller';
import { CreateRoleUseCase } from './use-cases/create-role/create-role.use-case';
import { UpdateRoleUseCase } from './use-cases/update-role/update-role.use-case';
import { DeleteRoleUseCase } from './use-cases/delete-role/delete-role.use-case';
import { GetRoleUseCase } from './use-cases/get-role/get-role.use-case';
import { DBRolesService } from '../db/services/db-roles.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([RolesEntity])
  ],
  controllers: [RolesController],
  providers: [
    CreateRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    GetRoleUseCase,
    DBRolesService
  ],
})
export class RolesModule { }