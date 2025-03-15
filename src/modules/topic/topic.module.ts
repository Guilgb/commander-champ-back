import { Module } from '@nestjs/common';
import { TopicsEntity } from '../db/entities/topics.entity';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTopicUseCase } from './use-cases/create-topic/create-topic.use-case';
import { DeleteTopicUseCase } from './use-cases/delete-topic/delete-topic.use-case';
import { GetTopicUseCase } from './use-cases/get-topic-by-id/get-topic-by-id.use-case';
import { LisTopicsUseCase } from './use-cases/list-topics/dto/list-topics.use-case';
import { UpdateTopicUseCase } from './use-cases/update-topic/update-topic.use-case';
import { DBTopicsService } from '../db/services/db-topics.service';
import { UsersEntity } from '../db/entities/user.entity';
import { CategoriesEntity } from '../db/entities/categories.entity';
import { TopicController } from './topic.controller';


@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([TopicsEntity, UsersEntity, CategoriesEntity])
  ],
  controllers: [TopicController],
  providers: [
    DBTopicsService,
    CreateTopicUseCase,
    UpdateTopicUseCase,
    DeleteTopicUseCase,
    GetTopicUseCase,
    LisTopicsUseCase
  ],
})
export class TopicModule {}