import { Global, Module } from '@nestjs/common';
import { PrismaCategoryRepository } from './prisma.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    { provide: 'CategoryRepository', useClass: PrismaCategoryRepository },
  ],
  exports: [
    {
      provide: 'CategoryRepository',
      useClass: PrismaCategoryRepository,
    },
  ],
})
export class CategoryRepositoryModule {}
