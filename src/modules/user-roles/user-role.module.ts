import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../db/entities/user.entity';
import { DBUsersService } from '../db/services/db-users.service';
import { RolesEntity } from '../db/entities/roles.entity';
import { UserRolesEntity } from '../db/entities/user-roles.entity';
import { DBUserRolesService } from '../db/services/db-user-roles.service';
import { UserRoleController } from './user-role.controller';
import { GetRolesByUserUseCase } from './use-cases/get-roles-by-user/get-roles-by-user.use-case';
import { RemoveRoleFromUserUseCase } from './use-cases/remove-role-from-user/remove-role-from-user.use-case';
import { UpdateUserRoleUseCase } from './use-cases/update-user-role/update-user-role.use-case';
import { AssignRoleToUserUseCase } from './use-cases/assign-role/assign-role.use-case';
import { GetUsersByRoleUseCase } from './use-cases/get-users-by-role/get-users-by-role.use-case';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([UsersEntity, RolesEntity, UserRolesEntity])
  ],
  controllers: [UserRoleController],
  providers: [
    DBUsersService,
    DBUserRolesService,
    AssignRoleToUserUseCase,
    RemoveRoleFromUserUseCase,
    GetRolesByUserUseCase,
    GetUsersByRoleUseCase,
    UpdateUserRoleUseCase,
  ],
})

export class UserRoleModule { }