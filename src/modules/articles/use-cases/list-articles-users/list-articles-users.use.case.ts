import { Injectable } from "@nestjs/common";
import { ListArticlesUsersResponse } from "./dto/list-articles-users.dto";
import { DBArticleService } from "@modules/db/services/db-articles.service";

@Injectable()
export class ListArticlesUsersUseCase {
  constructor(
    private readonly dbArticleService: DBArticleService,
  ) {}

  async execute(
  ): Promise<ListArticlesUsersResponse | any> {
    return await this.dbArticleService.listArticlesAndUsers();
  }
}