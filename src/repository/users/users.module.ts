import { Global, Module } from '@nestjs/common';
import { PrismaUserRepository } from './prisma.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
@Global()
@Module({
  imports: [PrismaModule],
  providers: [{ provide: 'UserRepository', useClass: PrismaUserRepository }],
  exports: [
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    },
  ],
})
export class UserRepositoryModule {}
