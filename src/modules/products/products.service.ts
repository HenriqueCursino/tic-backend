import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProduct, deleteProduct, useProduct } from './products.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const product = await this.prisma.products.findMany();
    if (!product.length) throw new BadRequestException('Not found product.')
    return product;
  }

  async useProduct(data: useProduct) {
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
  }

  async devolutionProduct(data: useProduct) {
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
  }

  async create(data: createProduct) {
    const productExist = await this.prisma.products.findFirst({
      where: {
        sku: data.sku
      }
    })

    if (productExist) {
      throw new Error("This is already registered.")
    }

    console.log(productExist);
    console.log(data);

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
  }

  async delete(hash: string) {
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
  }
}
