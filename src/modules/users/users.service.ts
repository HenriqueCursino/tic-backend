import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createUser, deleteUser, login } from './users.dto';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/shared/errors/error';
import { EntityMapper } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private entityMapper: EntityMapper
  ) {}

  async getAll() {
    try {
      const users = await this.prisma.users.findMany({
        where: {
          deleted_at: null
        }
      });
  
      if (!users.length) {
        throw new BadRequestException('Not found users.');
      }
  
      return this.entityMapper.mapToUserList(users)
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to get all users',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
  

  async create(data: createUser) {
    try {
      const userExist = await this.prisma.users.findFirst({
        where: {
          email: data.email,
        },
      });

      if (userExist) {
        throw new BadRequestException('User already registered.');
      }

      const securityKey = parseInt(process.env.PASSWORD_SECURITY);
      const encryptedPassword = bcrypt.hashSync(data.password, securityKey);
      data.password = encryptedPassword;

      const newUser = await this.prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      return newUser;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to create user',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login(data: login) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        throw new BadRequestException('Invalid credentials.');
      }

      const isValid = await bcrypt.compare(data.password, user.password);
      return isValid;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to login',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(data: deleteUser) {
    try {
      const user = await this.prisma.users.findFirst({
        where: {
          email: data.email,
          deleted_at: null,
        },
      });

      if (!user) {
        return;
      }

      const now = new Date();
      const deletedUser = await this.prisma.users.update({
        where: { id: user.id },
        data: {
          deleted_at: now,
        },
      });

      return deletedUser;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to delete user',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
