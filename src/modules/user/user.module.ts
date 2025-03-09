import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../db/entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { DBUsersService } from '../db/services/db-users.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([UsersEntity])
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    DBUsersService
  ],
})
export class UsersModule { }