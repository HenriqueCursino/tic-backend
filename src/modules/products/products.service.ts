import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { createProduct, useProduct } from './products.dto';
import { AppError } from 'src/shared/errors/error';
import { EntityMapper } from './products.entity';
import { ProductsRepository } from 'src/repository/products/products.interface';
import { UserRepository } from 'src/repository/users/users.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductsRepository')
    private readonly repository: ProductsRepository,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    private entity: EntityMapper,
  ) {}

  async getAll() {
    try {
      const product = await this.repository.getAllProducts();
      if (!product.length) throw new BadRequestException('Not found product.');

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
      const product = await this.repository.getProductByHash(data.productHash);

      const user = await this.userRepository.getUserByHash(data.userHash);

      const usingProduct = await this.repository.usingProduct(user.id);

      await this.repository.updateUseProduct(product.id, usingProduct.id);

      return usingProduct;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to update product',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async devolutionProduct(data: useProduct) {
    try {
      const product = await this.repository.getProductByHash(data.productHash);

      const user = await this.userRepository.getUserByHash(data.userHash);

      const usingProduct = await this.repository.postProductControl(user.id);

      await this.repository.updateUseProduct(product.id, usingProduct.id);

      return usingProduct;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to devolution product',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: createProduct) {
    try {
      const productExist = await this.repository.getProductBySku(data.sku);

      if (productExist) {
        throw new Error('This is already registered.');
      }

      const newProduct = await this.repository.createProduct(data);

      return newProduct;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to create product',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(hash: string) {
    try {
      const product = await this.repository.getProductByHash(hash);

      if (!product) {
        throw new Error('Product not found.');
      }

      const deletedUser = await this.repository.deleteProduct(product.id);

      return deletedUser;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to delete product',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
