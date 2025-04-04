import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { CreateArticleUseCase } from "./use-cases/create-article/create-article.use-case";
import { DeleteArticleUseCase } from "./use-cases/delete-article/delete-article.use-case";
import { GetArticleByIdUseCase } from "./use-cases/get-article-by-id/get-article-by-id.use-case";
import { ListArticlesUseCase } from "./use-cases/list-articles/list-articles.use-case";
import { CreateArticleDto } from "./use-cases/create-article/dto/create-article.dto";
import { DeleteArticleDto } from "./use-cases/delete-article/dto/delete-article.dto";
import { GetArticleByIdDto } from "./use-cases/get-article-by-id/dto/get-article-by-id.dto";
import { UpdateArticleDto } from "./use-cases/update-article/dto/update-article.dto";
import { UpdateArticleUsecase } from "./use-cases/update-article/update-article.use-case";
import { ListArticlesUsersUseCase } from "./use-cases/list-articles-users/list-articles-users.use.case";

@Controller("/articles")
export class ArticlesController {
  constructor(
    private readonly createArticleUseCase: CreateArticleUseCase,
    private readonly updateArticleUseCase: UpdateArticleUsecase,
    private readonly deleteArticleUseCase: DeleteArticleUseCase,
    private readonly getArticleUseCase: GetArticleByIdUseCase,
    private readonly ListArticlesUseCase: ListArticlesUseCase,
    private readonly listArticlesUsersUseCase: ListArticlesUsersUseCase,
  ) { }

  @Post()
  async createArticle(
    @Body() input: CreateArticleDto
  ) {
    return await this.createArticleUseCase.execute(input);
  }

  @Put()
  async updateArticle(
    @Body() input: UpdateArticleDto
  ) {
    return await this.updateArticleUseCase.execute(input);
  }

  @Delete()
  async deleteArticle(
    @Body() input: DeleteArticleDto
  ) {
    return await this.deleteArticleUseCase.execute(input);
  }

  @Get('/id')
  async getArticle(
    @Body() input: GetArticleByIdDto
  ) {
    return await this.getArticleUseCase.execute(input);
  }

  @Get()
  async listArticles() {
    return await this.ListArticlesUseCase.execute();
  }

  @Get('/users')
  async listArticlesUsers() {
    return await this.listArticlesUsersUseCase.execute();
  }
}