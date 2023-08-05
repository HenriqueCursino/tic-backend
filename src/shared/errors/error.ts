import { HttpException, HttpStatus } from '@nestjs/common';

export class AppError extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
