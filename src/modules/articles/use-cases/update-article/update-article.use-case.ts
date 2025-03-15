import { Injectable } from "@nestjs/common";
import { DBArticleService } from "src/modules/db/services/db-articles.service";
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
        updated_at: new Date(),
      }
    );
  }
}