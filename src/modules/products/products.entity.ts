import { Injectable } from '@nestjs/common';
import { listProduct } from './products.dto';
import { ProductWithCategory } from 'src/repository/products/products.dto';

@Injectable()
export class EntityMapper {
  mapToProductList(modelProducts: ProductWithCategory[]): listProduct[] {
    return modelProducts.map((modelProduct) => ({
      category: modelProduct.category?.name,
      controlId: modelProduct.control_id,
      origin: modelProduct.origin?.name,
      room: modelProduct.room?.name,
      name: modelProduct.name,
      sku: modelProduct.sku,
      hash: modelProduct.hash,
      brokenAt: modelProduct.broken_at,
    }));
  }
}
