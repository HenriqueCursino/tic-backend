import { Injectable } from '@nestjs/common';
import { rooms } from '@prisma/client';
import { listRooms } from './rooms.dto';

@Injectable()
export class EntityMapper {
  mapToRoomList(modelRooms: rooms[]): listRooms[] {
    return modelRooms.map((modelRoom) => ({
      name: modelRoom.name,
      identfier_key: modelRoom.identfier_key,
    }));
  }
}
