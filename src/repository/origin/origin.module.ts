import { Global, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaOriginRepository } from '../origin/prisma.repository';
@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    { provide: 'OriginRepository', useClass: PrismaOriginRepository },
  ],
  exports: [
    {
      provide: 'OriginRepository',
      useClass: PrismaOriginRepository,
    },
  ],
})
export class OriginRepositoryModule {}
