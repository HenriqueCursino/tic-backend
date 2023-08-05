import { Injectable } from '@nestjs/common';
import { category } from '@prisma/client';
import { listCategory } from './category.dto';

@Injectable()
export class EntityMapper {
  mapToCategoryList(modelCategories: category[]): listCategory[] {
    return modelCategories.map((modelCategory) => ({
        name: modelCategory.name,
        description: modelCategory.description,
    }));
  }
}
