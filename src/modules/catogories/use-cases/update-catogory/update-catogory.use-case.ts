import { Injectable } from "@nestjs/common";
import { DbCategoriesService } from "src/modules/db/services/db-categories.service";
import { UpdateCategoriesDto } from "./dto/update-catogory.dto";

@Injectable()
export class UpdateCatogoryUseCase {
  constructor(
    private readonly dbCatogoriesService: DbCategoriesService,
  ) { }

  async execute(input: UpdateCategoriesDto) {
    return await this.dbCatogoriesService.updateCategory({
      id: input.id,
      name: input.name,
      description: input.description,
      updated_at: new Date(),
    });
  }
}