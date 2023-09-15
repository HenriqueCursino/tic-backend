import { category } from '@prisma/client';
import { createCategory } from 'src/modules/category/category.dto';

export interface CategoryRepository {
  getAllCategory(): Promise<category[]>;
  getCategoryByName(name: string): Promise<category>;
  createCategory(data: createCategory): Promise<category>;
}
