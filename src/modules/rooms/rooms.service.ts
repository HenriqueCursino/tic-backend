import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRoom } from './rooms.dto';
import { AppError } from 'src/shared/errors/error';
import { EntityMapper } from './rooms.entity';

@Injectable()
export class RoomService {
  constructor(
    private prisma: PrismaService,
    private entityMapper: EntityMapper
  ) {}

  async getAll() {
    try {
      const rooms = await this.prisma.rooms.findMany();
      if (!rooms.length) throw new BadRequestException('Not found room')

      return this.entityMapper.mapToRoomList(rooms);
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to get all rooms',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: createRoom) {
    try {
      const roomExist = await this.prisma.rooms.findFirst({
        where: {
          identfier_key: data.identfier_key
        }
      })

      if (roomExist) {
        return
      }

      const newRoom = await this.prisma.rooms.create({
        data: {
          name: data.name,
          identfier_key: data.identfier_key
        }
      })

      return newRoom
  } catch (error) {
    throw new AppError(
      error?.message || 'Failed to create room',
      error?.statusCode || HttpStatus.BAD_REQUEST,
    );
  }
  }
}
