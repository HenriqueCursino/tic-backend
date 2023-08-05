import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { createOrigin, listOrigin } from './origin.dto';
import { OriginService } from './origin.service';

@Controller('origin')
export class OriginController {
  constructor(private readonly OriginService: OriginService) {}

  @Get()
  async getAll(): Promise<listOrigin[]> {
    return this.OriginService.getAll();
  }

  @Post()
  async create(@Body() data: createOrigin, @Res() response: Response): Promise<void> {
    const newRoom = this.OriginService.create(data)
    if (newRoom) {
      response.status(200).send();
    } else {
      response.status(401).json({ message: 'Failed authentication' });
    }
  }
}
