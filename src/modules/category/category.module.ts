import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { EntityMapper } from './category.entity';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, EntityMapper],
})
export class RoomCategory {}
