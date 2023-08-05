import { Injectable } from '@nestjs/common';
import { listUsers } from './users.dto';
import { users } from '@prisma/client';

@Injectable()
export class EntityMapper {
  mapToUserList(modelUsers: users[]): listUsers[] {
    return modelUsers.map((modelUser) => ({
        name: modelUser.name,
        email: modelUser.email,
        hash: modelUser.hash,
        is_adm: modelUser.is_adm,
        created_at: modelUser.created_at,
    }));
  }
}
