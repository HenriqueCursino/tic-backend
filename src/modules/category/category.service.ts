import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCategory } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const category = await this.prisma.category.findMany();
    if (!category.length) throw new BadRequestException('Not found category.')
    return category;
  }

  async create(data: createCategory) {
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
  }
}
