import { Injectable } from '@nestjs/common';
import { origin } from '@prisma/client';
import { listOrigin } from './origin.dto';

@Injectable()
export class EntityMapper {
  mapToOriginList(modelOrigins: origin[]): listOrigin[] {
    return modelOrigins.map((modelOrigin) => ({
        name: modelOrigin.name,
    }));
  }
}
