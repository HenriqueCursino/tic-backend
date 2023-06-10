import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRoom } from './rooms.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const rooms = await this.prisma.rooms.findMany();
    if (!rooms.length) throw new BadRequestException('Not found users.')
    return rooms;
  }

  async create(data: createRoom) {
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
  }
}
