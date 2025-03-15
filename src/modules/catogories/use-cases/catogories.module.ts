import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "src/modules/db/entities/categories.entity";
import { CategoriesController } from "./catogories.controller";
import { CreateCatogoryUseCase } from "./create-catogory/create-catogory.use-case";
import { DeleteCatogoryUseCase } from "./delete-catogory/delete-catogory.use-case";
import { GetCatogoriesUseCase } from "./get-catogories/get-catogories.use-case";
import { GetCatogoryByIdUseCase } from "./get-catogory-by-id/get-catogory-by-id.use-case";
import { UpdateCatogoryUseCase } from "./update-catogory/update-catogory.use-case";
import { DbCategoriesService } from "src/modules/db/services/db-categories.service";

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({}),
    TypeOrmModule.forFeature([CategoriesEntity])
  ],
  controllers: [CategoriesController],
  providers: [
    DbCategoriesService,
    CreateCatogoryUseCase,
    UpdateCatogoryUseCase,
    DeleteCatogoryUseCase,
    GetCatogoriesUseCase,
    GetCatogoryByIdUseCase
  ],
})

export class CatogoriesModule { }