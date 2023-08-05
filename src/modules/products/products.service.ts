import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProduct, useProduct } from './products.dto';
import { AppError } from 'src/shared/errors/error';
import { EntityMapper } from './products.entity';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private entity: EntityMapper) {}

  async getAll() {
    try {
      const product = await this.prisma.products.findMany();
      if (!product.length) throw new BadRequestException('Not found product.')
      
      return this.entity.mapToProductList(product);
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to get all rooms',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async useProduct(data: useProduct) {
    try {
      const product = await this.prisma.products.findFirst({
          where: {
            hash: data.productHash
          }
      })

      const user = await this.prisma.users.findFirst({
        where: {
          hash: data.userHash
        }
      })

      const usingProduct = await this.prisma.product_control.create({
        data: {
          user_id: user.id,
          using_at: new Date(),
        }
      })

      await this.prisma.products.update({
        where: {
          id: product.id
        },
        data: {
          control_id: usingProduct.id
        }
      })

      return usingProduct
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to update product',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async devolutionProduct(data: useProduct) {
    try {
      const product = await this.prisma.products.findFirst({
        where: {
          hash: data.productHash
        }
      })

      const user = await this.prisma.users.findFirst({
        where: {
          hash: data.userHash
        }
      })

      const usingProduct = await this.prisma.product_control.create({
        data: {
          user_id: user.id,
          devolution_at: new Date(),
        }
      })

      await this.prisma.products.update({
        where: {
          id: product.id
        },
        data: {
          control_id: usingProduct.id
        }
      })

      return usingProduct
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to devolution product',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: createProduct) {
    try {
      const productExist = await this.prisma.products.findFirst({
        where: {
          sku: data.sku
        }
      })

      if (productExist) {
        throw new Error("This is already registered.")
      }

      const newProduct = await this.prisma.products.create({
        data: {
          category_id: data.categoryId,
          control_id: data.controlId,
          origin_id: data.originId,
          room_id: data.roomId,
          name: data.name,
          sku: data.sku,
          broken_at: data.brokenAt ? new Date() : null,
        }
      })

      return newProduct
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to create product',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(hash: string) {
    try {
      const product = await this.prisma.products.findFirst({
        where: {
          hash: hash,
        }
      })

      if (!product) {
        throw new Error("Product not found.")
      }

      const now = new Date();
      const deletedUser = await this.prisma.products.update({
        where: { id: product.id },
        data: {
          deleted_at: now
        },
      });

      return deletedUser;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to delete product',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
