import { Injectable } from '@nestjs/common';
import { products } from '@prisma/client';
import { listProduct } from './products.dto';

@Injectable()
export class EntityMapper {
  mapToProductList(modelProducts: products[]): listProduct[] {
    return modelProducts.map((modelProduct) => ({
      categoryId: modelProduct.category_id,
      controlId: modelProduct.control_id,
      originId: modelProduct.origin_id,
      roomId: modelProduct.room_id,
      name: modelProduct.name,
      sku: modelProduct.sku,
      hash: modelProduct.hash,
      brokenAt: modelProduct.broken_at,
    }));
  }
}
