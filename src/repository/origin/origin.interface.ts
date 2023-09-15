import { origin } from '@prisma/client';
import { createOrigin } from 'src/modules/origin/origin.dto';

export interface OriginRepository {
  getAllOrigin(): Promise<origin[]>;
  getOriginByName(name: string): Promise<origin>;
  createOrigin(data: createOrigin): Promise<origin>;
}
