import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { createCategory, listCategory } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly CategoryService: CategoryService) {}

  @Get()
  async getAllUsers(): Promise<listCategory[]> {
    return this.CategoryService.getAll();
  }

  @Post()
  async create(
    @Body() data: createCategory,
    @Res() response: Response,
  ): Promise<void> {
    const newRoom = this.CategoryService.create(data);
    if (newRoom) {
      response.status(200).send();
    } else {
      response.status(401).json({ message: 'Failed authentication' });
    }
  }
}
