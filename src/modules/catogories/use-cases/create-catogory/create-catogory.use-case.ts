import { Injectable } from "@nestjs/common";
import { DbCategoriesService } from "modules/db/services/db-categories.service";
import { CreateCategoryDto } from "./dto/create-catogory.dto";

@Injectable()
export class CreateCatogoryUseCase {
  constructor(
    private readonly dbCatogoriesService: DbCategoriesService,
  ) { }

  async execute(input: CreateCategoryDto) {

    const created_at = new Date();
    const updated_at = new Date();

    return await this.dbCatogoriesService.createCategory({
      name: input.name,
      description: input.description,
      created_at: created_at,
      updated_at: updated_at
    });
  }
}