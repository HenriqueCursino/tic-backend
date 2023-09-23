import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { createUser, deleteUser, login } from './users.dto';
import * as bcrypt from 'bcrypt';
import { AppError } from 'src/shared/errors/error';
import { EntityMapper } from './users.entity';
import { UserRepository } from 'src/repository/users/users.interface';
@Injectable()
export class UsersService {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    private entityMapper: EntityMapper,
  ) {}

  async getAll() {
    try {
      const users = await this.repository.getAllUsers();

      if (!users.length) {
        throw new BadRequestException('Not found users.');
      }

      return this.entityMapper.mapToUserList(users);
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to get all users',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async create(data: createUser) {
    try {
      const userExist = await this.repository.getUserByEmail(data.email);

      if (userExist) {
        throw new BadRequestException('User already registered.');
      }

      const securityKey = parseInt(process.env.PASSWORD_SECURITY);
      const encryptedPassword = bcrypt.hashSync(data.password, securityKey);
      data.password = encryptedPassword;

      const newUser = await this.repository.createUser(data);

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
      const user = await this.repository.getUserByEmail(data.email);

      if (!user) {
        throw new BadRequestException('Invalid credentials.');
      }

      const isValid = await bcrypt.compare(data.password, user.password);
      if (isValid) {
        return user;
      }

      return isValid;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to login',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async changePassword(data: login) {
    try {
      const user = await this.repository.getUserByEmail(data.email);

      if (!user) {
        throw new BadRequestException('Invalid credentials.');
      }

      const securityKey = parseInt(process.env.PASSWORD_SECURITY);
      const newPassword = bcrypt.hashSync(data.password, securityKey);

      const newUser = await this.repository.changePassword(
        user.id,
        newPassword,
      );

      return newUser;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to login',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(data: deleteUser) {
    try {
      const user = await this.repository.getUserByEmail(data.email);

      if (!user) {
        return;
      }

      const deletedUser = await this.repository.deleteUser(user.id);

      return deletedUser;
    } catch (error) {
      throw new AppError(
        error?.message || 'Failed to delete user',
        error?.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
