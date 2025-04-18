import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../db/entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { DBUsersService } from '../db/services/db-users.service';
import { RolesEntity } from '@modules/db/entities/roles.entity';
import { UserRolesEntity } from '@modules/db/entities/user-roles.entity';
import { DBUserRolesService } from '@modules/db/services/db-user-roles.service';
import { ListUsersUseCase } from './use-cases/list-users/list-users.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user/delete-user.use-case';
import { UserStatisticsUseCase } from './use-cases/user-statistics/user-statistics.use-case';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([UsersEntity, RolesEntity, UserRolesEntity])
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    ListUsersUseCase,
    DeleteUserUseCase,
    UserStatisticsUseCase,
    DBUsersService,
    DBUserRolesService,
  ],
})
export class UsersModule { }