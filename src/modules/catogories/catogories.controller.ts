import { Body, Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { CreateCatogoryUseCase } from "./use-cases/create-catogory/create-catogory.use-case";
import { CreateCategoryDto } from "./use-cases/create-catogory/dto/create-catogory.dto";
import { DeleteCatogoryUseCase } from "./use-cases/delete-catogory/delete-catogory.use-case";
import { GetCatogoriesUseCase } from "./use-cases/get-catogories/get-catogories.use-case";
import { GetCatogoryByIdUseCase } from "./use-cases/get-catogory-by-id/get-catogory-by-id.use-case";
import { UpdateCategoriesDto } from "./use-cases/update-catogory/dto/update-catogory.dto";
import { UpdateCatogoryUseCase } from "./use-cases/update-catogory/update-catogory.use-case";


@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUseCase: CreateCatogoryUseCase,
    private readonly updateCategoryUseCase: UpdateCatogoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCatogoryUseCase,
    private readonly listCategoriesUseCase: GetCatogoriesUseCase,
    private readonly getCategoryUseCase: GetCatogoryByIdUseCase,
  ) { }

  @Post()
  async createCategory(
    @Body() input: CreateCategoryDto,
  ) {
    return await this.createCategoryUseCase.execute(input);
  }

  @Get()
  async listCategories() {
    return await this.listCategoriesUseCase.execute();
  }

  @Get('/id')
  async getCategoryById(id: number) {
    return await this.getCategoryUseCase.execute(id);
  }

  @Delete()
  async deleteCategory(id: number) {
    return await this.deleteCategoryUseCase.execute(id);
  }

  @Put()
  async updateCategory(
    @Body() input: UpdateCategoriesDto,
  ) {
    return await this.updateCategoryUseCase.execute(input);
  }
}