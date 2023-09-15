import { product_control, products } from '@prisma/client';
import { createProduct } from 'src/modules/products/products.dto';
import { ProductWithCategory } from './products.dto';

export interface ProductsRepository {
  getAllProducts(): Promise<ProductWithCategory[]>;
  getProductByHash(hash: string): Promise<products>;
  getProductBySku(sku: string): Promise<products>;
  usingProduct(userId: number): Promise<product_control>;
  updateUseProduct(productId: number, controlId: number): Promise<products>;
  postProductControl(userId: number): Promise<product_control>;
  createProduct(data: createProduct): Promise<products>;
  deleteProduct(productId: number): Promise<products>;
}
