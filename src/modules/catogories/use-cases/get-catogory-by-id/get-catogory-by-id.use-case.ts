import { Injectable } from "@nestjs/common";
import { DbCategoriesService } from "src/modules/db/services/db-categories.service";

@Injectable()
export class GetCatogoryByIdUseCase {
  constructor(
    private readonly dbCatogoriesService: DbCategoriesService,
  ) { }

  async execute(id: number) {
    return await this.dbCatogoriesService.getCategoryById(id);
  }
}