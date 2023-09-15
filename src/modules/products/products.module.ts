import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { EntityMapper } from './products.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, EntityMapper],
})
export class ProductModule {}
