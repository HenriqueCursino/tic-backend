import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsRepository } from './products.interface';
import { product_control, products } from '@prisma/client';
import { createProduct } from 'src/modules/products/products.dto';
import { ProductWithCategory } from './products.dto';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prisma: PrismaService) {}

  async getAllProducts(): Promise<ProductWithCategory[]> {
    const products = await this.prisma.products.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
        origin: {
          select: {
            name: true,
          },
        },
        room: {
          select: {
            name: true,
          },
        },
      },
      where: {
        deleted_at: null,
      },
    });

    return products as ProductWithCategory[];
  }

  async getProductByHash(hash: string): Promise<products> {
    return await this.prisma.products.findFirst({
      where: {
        hash: hash,
      },
    });
  }

  async getProductBySku(sku: string): Promise<products> {
    return await this.prisma.products.findFirst({
      where: {
        sku: sku,
      },
    });
  }

  async usingProduct(userId: number): Promise<product_control> {
    return await this.prisma.product_control.create({
      data: {
        user_id: userId,
        using_at: new Date(),
      },
    });
  }

  async updateUseProduct(
    productId: number,
    controlId: number,
  ): Promise<products> {
    return await this.prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        control_id: controlId,
      },
    });
  }

  async postProductControl(userId: number): Promise<product_control> {
    return await this.prisma.product_control.create({
      data: {
        user_id: userId,
        devolution_at: new Date(),
      },
    });
  }

  async createProduct(data: createProduct): Promise<products> {
    return await this.prisma.products.create({
      data: {
        category_id: data.categoryId,
        control_id: data.controlId,
        origin_id: data.originId,
        room_id: data.roomId,
        name: data.name,
        sku: data.sku,
        broken_at: data.brokenAt ? new Date() : null,
      },
    });
  }

  async deleteProduct(productId: number): Promise<products> {
    const now = new Date();

    return await this.prisma.products.update({
      where: { id: productId },
      data: {
        deleted_at: now,
      },
    });
  }
}
