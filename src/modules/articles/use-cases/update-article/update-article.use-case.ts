import { Injectable } from "@nestjs/common";
import { DBArticleService } from "modules/db/services/db-articles.service";
import { UpdateArticleDto } from "./dto/update-article.dto";

@Injectable()
export class UpdateArticleUsecase {
  constructor(
    private readonly dbArticlesService: DBArticleService,
  ) { }
  async execute(input: UpdateArticleDto) {
    return await this.dbArticlesService.update(
      {
        id: input.id,
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
        created_at: input.created_at,
        updated_at: new Date(),
      }
    );
  }
}