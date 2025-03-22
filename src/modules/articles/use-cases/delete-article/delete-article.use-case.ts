import { Injectable } from "@nestjs/common";
import { DBArticleService } from "modules/db/services/db-articles.service";
import { DeleteArticleDto } from "./dto/delete-article.dto";

@Injectable()
export class DeleteArticleUseCase {
  constructor(
    private readonly dbArticlesService: DBArticleService,
  ) { }
  async execute(input: DeleteArticleDto) {
    return await this.dbArticlesService.remove(input.id);
  }
}