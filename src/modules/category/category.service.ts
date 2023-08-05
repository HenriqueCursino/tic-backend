import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCategory } from './category.dto';
import { EntityMapper } from './category.entity';
import { AppError } from 'src/shared/errors/error';

@Injectable()
export class CategoryService {
  constructor(
    private entity: EntityMapper,
    private prisma: PrismaService) {}

  async getAll() {
    try {
      const category = await this.prisma.category.findMany();
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
      const categoryExist = await this.prisma.category.findFirst({
        where: {
          name: data.name,
        }
      })

      if (categoryExist) {
        throw new Error("This category is already registered.")
      }

      const newCategory = await this.prisma.category.create({
        data: {
          name: data.name,
          description: data.description,
        }
      })

    return newCategory
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to get all categories',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
