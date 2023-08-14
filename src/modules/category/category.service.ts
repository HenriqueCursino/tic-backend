import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCategory } from './category.dto';
import { EntityMapper } from './category.entity';
import { AppError } from 'src/shared/errors/error';
import { CategoryRepository } from 'src/repository/category/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepository') private readonly repository: CategoryRepository,
    private entity: EntityMapper
    ) {}

  async getAll() {
    try {
      const category = await this.repository.getAllCategory()
      if (!category.length) throw new BadRequestException('Not found category.')
      return this.entity.mapToCategoryList(category);
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to get all categories',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: createCategory) {
    try {
      const categoryExist = await this.repository.getCategoryByName(data.name)

      if (categoryExist) {
        throw new Error("This category is already registered.")
      }

      const newCategory = await this.repository.createCategory(data)

    return newCategory
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to get all categories',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
