import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TopicsEntity } from '../entities/topics.entity';
import { ICreateTopic, ICreateTopicUpdate } from '../types/ICreateTopic';
import { UsersEntity } from '../entities/user.entity';
import { CategoriesEntity } from '../entities/categories.entity';

@Injectable()
export class DBTopicsService {
  constructor(
    @InjectRepository(TopicsEntity)
    private topicsRepository: Repository<TopicsEntity>,
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>,
  ) { }

  async createTopic(input: ICreateTopic): Promise<TopicsEntity> {

    try {
      const user = await this.usersRepository.findOne({ where: { id: input.user_id } });
      if (!user) {
        throw new InternalServerErrorException('User not found');
      }

      const category = await this.categoriesRepository.findOne({ where: { id: input.category_id } });

      if (!category) {
        throw new InternalServerErrorException('Category not found');
      }
      const topic = this.topicsRepository.create({
        title: input.title,
        content: input.content,
        user: user,
        category: category,
        created_at: new Date(),
        updated_at: new Date(),
      });
      return await this.topicsRepository.save(topic);
    } catch (error) {
      throw new InternalServerErrorException('Error creating topic');
    }
  }

  async findAll(): Promise<TopicsEntity[]> {
    try {
      return await this.topicsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error finding all topics');
    }
  }

  async findOne(id: number): Promise<TopicsEntity> {
    try {
      return await this.topicsRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new InternalServerErrorException(`Error finding topic with id ${id}`);
    }
  }

  async update(input: ICreateTopicUpdate): Promise<TopicsEntity> {
    try {

      const user = await this.usersRepository.findOne({ where: { id: input.user_id } });

      if (!user) {
        throw new InternalServerErrorException('User not found');
      }

      const category = await this.categoriesRepository.findOne({ where: { id: input.category_id } });

      if (!category) {
        throw new InternalServerErrorException('Category not found');
      }

      await this.topicsRepository.update(
        { id: input.id },
        {
          category: category,
          user: user,
          title: input.title,
          content: input.content,
          updated_at: new Date(),
        }
      );
      return await this.topicsRepository.findOne({ where: { id: input.id } });
    } catch (error) {
      throw new InternalServerErrorException(`Error updating topic with id ${input.id}`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.topicsRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(`Error removing topic with id ${id}`);
    }
  }
}