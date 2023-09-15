import { Body, Controller, Delete, Get, Post, Res } from '@nestjs/common';
import { createUser, login, deleteUser, listUsers } from './users.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<listUsers[]> {
    return this.UserService.getAll();
  }

  @Post()
  async create(
    @Body() data: createUser,
    @Res() response: Response,
  ): Promise<void> {
    const newUser = this.UserService.create(data);
    if (newUser) {
      response.status(200).send();
    } else {
      response.status(401).json({ message: 'Failed to create user' });
    }
  }

  @Delete()
  async delete(
    @Body() data: deleteUser,
    @Res() response: Response,
  ): Promise<void> {
    const loginResult = await this.UserService.delete(data);
    if (loginResult) {
      response.status(204).send();
    } else {
      response.status(401).json({ message: 'Failed to delete user' });
    }
  }

  @Post('login')
  async login(@Body() data: login, @Res() response: Response): Promise<void> {
    const loginResult = await this.UserService.login(data);
    if (loginResult) {
      response.status(200).send();
    } else {
      response.status(401).json({ message: 'Failed authentication' });
    }
  }
}
