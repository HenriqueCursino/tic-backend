import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OriginController } from './origin.controller';
import { OriginService } from './origin.service';
import { EntityMapper } from './origin.entity';

@Module({
  controllers: [OriginController],
  providers: [OriginService, PrismaService, EntityMapper],
})
export class OriginModule {}
