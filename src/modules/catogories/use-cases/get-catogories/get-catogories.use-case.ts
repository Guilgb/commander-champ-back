import { Injectable } from "@nestjs/common";
import { DbCategoriesService } from "modules/db/services/db-categories.service";

@Injectable()
export class GetCatogoriesUseCase {
  constructor(
    private readonly dbCatogoriesService: DbCategoriesService,
  ) { }

  async execute() {
    return await this.dbCatogoriesService.getCategories();
  }
}