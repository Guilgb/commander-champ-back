import { Injectable } from "@nestjs/common";
import { DBArticleService } from "src/modules/db/services/db-articles.service";
import { GetArticleByIdDto } from "./dto/get-article-by-id.dto";

@Injectable()
export class GetArticleByIdUseCase {
  constructor(
    private readonly dbArticlesService: DBArticleService,
  ) { }
  async execute(input: GetArticleByIdDto) {
    return await this.dbArticlesService.findOne(input.id);
  }
}