import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createOrigin } from './origin.dto';
import { AppError } from 'src/shared/errors/error';
import { EntityMapper } from './origin.entity';

@Injectable()
export class OriginService {
  constructor(
    private prisma: PrismaService,
    private entity: EntityMapper) {}

  async getAll() {
    try { 
      const origin = await this.prisma.origin.findMany();
      if (!origin.length) throw new BadRequestException('Not found origin.')
      return this.entity.mapToOriginList(origin);
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to get all origins',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: createOrigin) {
    try {
      const originExist = await this.prisma.origin.findFirst({
        where: {
          name: data.name,
        }
      })

      if (originExist) {
        throw new Error("This is already registered")
      }

      const newOrgin = await this.prisma.origin.create({
        data: {
          name: data.name,
        }
      })

      return newOrgin
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to create room',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
