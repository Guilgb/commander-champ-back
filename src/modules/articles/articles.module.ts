import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBTopicsService } from '../db/services/db-topics.service';
import { UsersEntity } from '../db/entities/user.entity';
import { ArticlesEntity } from '../db/entities/articles.entity';
import { ArticlesController } from './articles.controller';
import { CreateArticleUseCase } from './use-cases/create-article/create-article.use-case';
import { DeleteArticleUseCase } from './use-cases/delete-article/delete-article.use-case';
import { GetArticleByIdUseCase } from './use-cases/get-article-by-id/get-article-by-id.use-case';
import { ListArticlesUseCase } from './use-cases/list-articles/list-articles.use-case';
import { UpdateArticleUsecase } from './use-cases/update-article/update-article.use-case';
import { TopicsEntity } from '../db/entities/topics.entity';
import { DBArticleService } from '../db/services/db-articles.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([ArticlesEntity, UsersEntity, TopicsEntity])
  ],
  controllers: [ArticlesController],
  providers: [
    DBArticleService,
    CreateArticleUseCase,
    UpdateArticleUsecase,
    DeleteArticleUseCase,
    GetArticleByIdUseCase,
    ListArticlesUseCase,
  ],
})
export class ArticlesModule { }