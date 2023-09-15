/* eslint-disable prettier/prettier */
import { category, origin, products, rooms } from '@prisma/client';

export type ProductWithCategory = products & {
  category?: category;
  origin?: origin;
  room?: rooms;
};
