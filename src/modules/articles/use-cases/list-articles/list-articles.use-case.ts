import { Injectable } from "@nestjs/common";
import { DBArticleService } from "src/modules/db/services/db-articles.service";

@Injectable()
export class ListArticlesUseCase {
  constructor(
    private readonly dbArticlesService: DBArticleService,
  ) { }
  async execute() {
    return await this.dbArticlesService.findAll();
  }
}