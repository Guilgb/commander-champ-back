import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriesEntity } from "../entities/categories.entity";
import { Repository } from "typeorm";
import { ICategory, ICategoryCreate, ICategoryUpdate } from "../types/ICategory";

@Injectable()
export class DbCategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoriesRepository: Repository<CategoriesEntity>
  ) { }

  async createCategory(input: ICategoryCreate): Promise<CategoriesEntity> {
    const { name, description, created_at, updated_at } = input;

    try {
      return await this.categoriesRepository.save({
        name,
        description,
        created_at,
        updated_at
      });
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  async getCategories(): Promise<CategoriesEntity[]> {
    try {
      return await this.categoriesRepository.find();
    } catch (error) {
      throw new Error(`Failed to get categories: ${error.message}`);
    }
  }

  async getCategoryById(id: number): Promise<CategoriesEntity> {
    try {
      return await this.categoriesRepository.findOne({ where: { id: id } });
    } catch (error) {
      throw new Error(`Failed to get category by id: ${error.message}`);
    }
  }

  async updateCategory(input: ICategoryUpdate): Promise<CategoriesEntity> {
    const { id, name, description, updated_at } = input;

    try {
      const category = await this.getCategoryById(id);

      if (!category) {
        throw new Error(`Category with id ${id} not found`);
      }

      category.name = name;
      category.description = description;
      category.updated_at = updated_at;

      return await this.categoriesRepository.save(category);
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  async deleteCategory(id: number): Promise<boolean> {
    try {
      const category = await this.getCategoryById(id);
      if (!category) {
        throw new Error(`Category with id ${id} not found`);
      }

      await this.categoriesRepository.delete(category);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }
}