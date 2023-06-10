import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUser, deleteUser, login } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.users.findMany({
      where: {
        deleted_at: null
      }
    });
    if (!users.length) throw new BadRequestException('Not found users.')
    return users;
  }

  async create(data: createUser) {
    const userExist = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      }
    })

    if (userExist) {
      throw new BadRequestException('User already registered.')
    }

    const securityKey = parseInt(process.env.PASSWORD_SECURITY);
    const encryptedPassword = bcrypt.hashSync(data.password, securityKey)
    data.password = encryptedPassword

    const newUser = await this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      }
    })

    return newUser
  }

  async login(data: login) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: data.email,
      }
    })

    const isValid = await bcrypt.compare(data.password, user.password)
    return isValid;
  }

  async delete(data: deleteUser) {
    const user = await this.prisma.users.findFirst({
      where: {
        email: data.email,
        deleted_at: null
      }
    })

    if (!user) {
      return
    }

    const now = new Date();
    const deletedUser = await this.prisma.users.update({
      where: { id: user.id },
      data: {
        deleted_at: now
      },
    });

    return deletedUser;
  }
}
