import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticlesEntity } from '../entities/articles.entity';
import { IArticleCreate, IArticleUpdate } from '../types/IArticle';
import { UsersEntity } from '../entities/user.entity';
import { TopicsEntity } from '../entities/topics.entity';

@Injectable()
export class DBArticleService {
  constructor(
    @InjectRepository(ArticlesEntity)
    private readonly dbArticleRepository: Repository<ArticlesEntity>,
    @InjectRepository(UsersEntity)
    private readonly dbUserRepository: Repository<UsersEntity>,
    @InjectRepository(TopicsEntity)
    private readonly dbTopicRepository: Repository<TopicsEntity>,
  ) { }

  async findAll(): Promise<ArticlesEntity[]> {
    try {
      return await this.dbArticleRepository.find();
    } catch (error) {
      throw new Error(`Error finding all articles: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<ArticlesEntity> {
    try {
      return await this.dbArticleRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new Error(`Error finding article with id ${id}: ${error.message}`);
    }
  }

  async create(input: IArticleCreate): Promise<ArticlesEntity> {
    try {
      const user = await this.dbUserRepository.findOne({ where: { id: input.user_id } });
      if (!user) {
        throw new Error(`User with id ${input.user_id} not found`);
      }

      const topics = await this.dbTopicRepository.findOne({ where: { id: input.topic_id } });
      if (!topics) {
        throw new Error(`Topic with id ${input.topic_id} not found`);
      }

      const article = await this.dbArticleRepository.create({
        title: input.title,
        content: input.content,
        user: user,
        topic: topics,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return await this.dbArticleRepository.save(article);
    } catch (error) {
      throw new Error(`Error creating article: ${error.message}`);
    }
  }

  async update(input: IArticleUpdate): Promise<ArticlesEntity> {
    try {
      const user = await this.dbUserRepository.findOne({ where: { id: input.user_id } });
      if (!user) {
        throw new Error(`User with id ${input.user_id} not found`);
      }

      const topics = await this.dbTopicRepository.findOne({ where: { id: input.topic_id } });
      if (!topics) {
        throw new Error(`Topic with id ${input.topic_id} not found`);
      }
      console.log(user)
      console.log(topics)
      await this.dbArticleRepository.update(
        { id: input.id },
        {
          title: input.title,
          content: input.content,
          user: user,
          topic: topics,
          updated_at: new Date(),
        }
      );
      return await this.dbArticleRepository.findOne({ where: { id: input.id } });
    } catch (error) {
      throw new Error(`Error updating article with id ${input.id}: ${error.message}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.dbArticleRepository.delete(id);
    } catch (error) {
      throw new Error(`Error removing article with id ${id}: ${error.message}`);
    }
  }
}