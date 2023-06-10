import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createOrigin } from './origin.dto';

@Injectable()
export class OriginService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const origin = await this.prisma.origin.findMany();
    if (!origin.length) throw new BadRequestException('Not found origin.')
    return origin;
  }

  async create(data: createOrigin) {
    const originExist = await this.prisma.origin.findFirst({
      where: {
        name: data.name,
      }
    })

    if (originExist) {
      throw new Error("This is already registered.")
    }

    const newOrgin = await this.prisma.origin.create({
      data: {
        name: data.name,
      }
    })

    return newOrgin
  }
}
