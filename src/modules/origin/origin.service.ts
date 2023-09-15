import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { createOrigin } from './origin.dto';
import { AppError } from 'src/shared/errors/error';
import { EntityMapper } from './origin.entity';
import { OriginRepository } from 'src/repository/origin/origin.interface';

@Injectable()
export class OriginService {
  constructor(
    @Inject('OriginRepository') private readonly repository: OriginRepository,
    private entity: EntityMapper,
  ) {}

  async getAll() {
    try {
      const origin = await this.repository.getAllOrigin();
      if (!origin.length) throw new BadRequestException('Not found origin.');
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
      const originExist = await this.repository.getOriginByName(data.name);

      if (originExist) {
        throw new Error('This is already registered');
      }

      const newOrgin = await this.repository.createOrigin(data);

      return newOrgin;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to create room',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
