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

  async findAll(): Promise<any[]> {
    try {
      // const articles = await this.dbArticleRepository.find();
      const articles = await this.dbArticleRepository
        .createQueryBuilder('articles')
        .leftJoinAndSelect('articles.user_id', 'user')
        .leftJoinAndSelect('articles.topic_id', 'topic')
        .getMany();

      return articles.map(article => ({
        id: article.id.toString(),
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        date: article.created_at.toLocaleDateString('pt-BR'),
        readTime: article.read_time,
        views: article.views,
        comments: article.comments,
        featured: article.featured,
        coverImage: article.cover_image,
        author: {
          name: article.user_id?.name || 'Unknown Author',
        },
        tags: article.tags
          .replace(/[\[\]"]+/g, '')
          .split(',')
          .map(tag => tag.trim()),
      }));
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
      // todo upar arquivo da imagem de fundo do artigo no s3
      const formattedTags = `[ ${input.tags} ]`;
      const article = await this.dbArticleRepository.create({
        title: input.title,
        content: input.content,
        user_id: user,
        topic_id: topics,
        comments: input.comments,
        views: input.views,
        featured: input.featured,
        cover_image: input.cover_image,
        tags: formattedTags,
        excerpt: input.excerpt,
        read_time: input.read_time,
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
      const formattedTags = `[ ${input.tags} ]`;
      await this.dbArticleRepository.update(
        { id: input.id },
        {
          title: input.title,
          content: input.content,
          user_id: user,
          comments: input.comments,
          views: input.views,
          featured: input.featured,
          cover_image: input.cover_image,
          tags: formattedTags,
          excerpt: input.excerpt,
          read_time: input.read_time,
          topic_id: topics,
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