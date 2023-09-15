import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { product_control } from '@prisma/client';
import { Response } from 'express';
import { createProduct, listProduct, useProduct } from './products.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get()
  async getAll(): Promise<listProduct[]> {
    return this.ProductService.getAll();
  }

  @Post()
  async create(
    @Body() data: createProduct,
    @Res() response: Response,
  ): Promise<void> {
    try {
      const newProduct = this.ProductService.create(data);
      if (newProduct) {
        response.status(200).send();
      }
    } catch (error) {
      response.status(401).json({ message: 'Failed to create product' });
    }
  }

  @Post('control')
  async(@Body() data: useProduct): Promise<product_control> {
    return this.ProductService.devolutionProduct(data);
  }

  @Delete('/:productHash')
  async delete(
    @Param('productHash') productHash: string,
    @Res() response: Response,
  ): Promise<void> {
    const deleteProduct = await this.ProductService.delete(productHash);
    if (deleteProduct) {
      response.status(204).send();
    } else {
      response.status(401).json({ message: 'Failed to delete product' });
    }
  }
}
