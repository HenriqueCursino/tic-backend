import { BadRequestException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { createRoom } from './rooms.dto';
import { AppError } from 'src/shared/errors/error';
import { EntityMapper } from './rooms.entity';
import { RoomRepository } from 'src/repository/rooms/rooms.interface';

@Injectable()
export class RoomService {
  constructor(
    @Inject('RoomRepository') private readonly repository: RoomRepository,
    private entityMapper: EntityMapper
  ) {}

  async getAll() {
    try {
      const rooms = await this.repository.getAllRooms()
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
      const roomExist = await this.repository.getRoomByIdentfierKey(data.identfier_key)

      if (roomExist) {
        return
      }

      const newRoom = await this.repository.createRoom(data)

      return newRoom
  } catch (error) {
    throw new AppError(
      error?.message || 'Failed to create room',
      error?.statusCode || HttpStatus.BAD_REQUEST,
    );
  }
  }
}
