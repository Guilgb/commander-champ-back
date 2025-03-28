import { Injectable } from "@nestjs/common";
import { DBArticleService } from "modules/db/services/db-articles.service";
import { CreateArticleDto } from "./dto/create-article.dto";

@Injectable()
export class CreateArticleUseCase {
  constructor(
    private readonly dbArticlesService: DBArticleService,
  ) { }
  async execute(input: CreateArticleDto) {
    return await this.dbArticlesService.create({
      title: input.title,
      content: input.content,
      user_id: input.user_id,
      topic_id: input.topic_id,
      excerpt: input.excerpt,
      read_time: input.read_time,
      comments: input.comments,
      views: input.views,
      featured: input.featured,
      cover_image: input.cover_image,
      tags: input.tags,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
}