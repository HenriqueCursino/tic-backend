import { Global, Module } from '@nestjs/common';
import { PrismaProductsRepository } from './prisma.repositoy';
import { PrismaModule } from 'src/prisma/prisma.module';
@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    { provide: 'ProductsRepository', useClass: PrismaProductsRepository },
  ],
  exports: [
    {
      provide: 'ProductsRepository',
      useClass: PrismaProductsRepository,
    },
  ],
})
export class ProductsRepositoryModule {}
