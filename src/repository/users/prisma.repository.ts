import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './users.interface';
import { createUser } from 'src/modules/users/users.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<users[]> {
    return await this.prisma.users.findMany({
      where: {
        deleted_at: null,
      },
    });
  }

  async getUserByEmail(email: string): Promise<users> {
    return this.prisma.users.findFirst({
      where: {
        email: email,
        deleted_at: null,
      },
    });
  }

  async getUserByHash(hash: string): Promise<users> {
    return await this.prisma.users.findFirst({
      where: {
        hash: hash,
      },
    });
  }

  async deleteUser(id: number): Promise<users> {
    const now = new Date();

    return await this.prisma.users.update({
      where: { id: id },
      data: {
        deleted_at: now,
      },
    });
  }

  async createUser(data: createUser): Promise<users> {
    return await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }
}
