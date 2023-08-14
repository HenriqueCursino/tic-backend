import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CategoryRepository } from "./category.interface";
import { category, rooms } from "@prisma/client";
import { createCategory } from "src/modules/category/category.dto";

@Injectable()
export class PrismaCategoryRepository implements CategoryRepository {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getAllCategory(): Promise<category[]> {
        return await this.prisma.category.findMany();
    }

    async getCategoryByName(name: string): Promise<category> {
        return await this.prisma.category.findFirst({
            where: {
              name: name,
            }
        })
    }

    async createCategory(data: createCategory): Promise<category> {
        return await this.prisma.category.create({
            data: {
              name: data.name,
              description: data.description,
            }
        })
    }
}
