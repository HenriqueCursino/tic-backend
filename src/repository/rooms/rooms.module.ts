import { Global, Module } from '@nestjs/common';
import { PrismaRoomRepository } from './prisma.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
@Global()
@Module({
  imports: [PrismaModule],
  providers: [
    { provide: 'RoomRepository', useClass: PrismaRoomRepository },
  ],
  exports: [
    {
      provide: 'RoomRepository',
      useClass: PrismaRoomRepository,
    },
  ],
})
export class RoomRepositoryModule {}
