import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "modules/db/entities/categories.entity";
import { CreateCatogoryUseCase } from "./use-cases/create-catogory/create-catogory.use-case";
import { DeleteCatogoryUseCase } from "./use-cases/delete-catogory/delete-catogory.use-case";
import { GetCatogoriesUseCase } from "./use-cases/get-catogories/get-catogories.use-case";
import { GetCatogoryByIdUseCase } from "./use-cases/get-catogory-by-id/get-catogory-by-id.use-case";
import { UpdateCatogoryUseCase } from "./use-cases/update-catogory/update-catogory.use-case";
import { DbCategoriesService } from "modules/db/services/db-categories.service";
import { CategoriesController } from "./catogories.controller";

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