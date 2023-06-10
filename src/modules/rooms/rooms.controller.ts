import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { rooms } from '@prisma/client';
import { Response } from 'express';
import { createRoom } from './rooms.dto';
import { RoomService } from './rooms.service';

@Controller('room')
export class RoomsController {
  constructor(private readonly RoomService: RoomService) {}

  @Get()
  async getAllUsers(): Promise<rooms[]> {
    return this.RoomService.getAll();
  }

  @Post()
  async create(@Body() data: createRoom, @Res() response: Response): Promise<void> {
    const newRoom = this.RoomService.create(data)
    if (newRoom) {
      response.status(200).send();
    } else {
      response.status(401).json({ message: 'Failed authentication' });
    }
  }
}
