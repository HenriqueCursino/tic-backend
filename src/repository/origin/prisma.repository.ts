import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { origin } from '@prisma/client';
import { createOrigin } from 'src/modules/origin/origin.dto';
import { OriginRepository } from './origin.interface';

@Injectable()
export class PrismaOriginRepository implements OriginRepository {
  constructor(private prisma: PrismaService) {}

  async getAllOrigin(): Promise<origin[]> {
    return await this.prisma.origin.findMany();
  }

  async getOriginByName(name: string): Promise<origin> {
    return await this.prisma.origin.findFirst({
      where: {
        name: name,
      },
    });
  }

  async createOrigin(data: createOrigin): Promise<origin> {
    return await this.prisma.origin.create({
      data: {
        name: data.name,
      },
    });
  }
}
