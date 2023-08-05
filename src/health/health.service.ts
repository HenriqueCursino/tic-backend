import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  async checkHealth(): Promise<{ message: string }> {
    return { message: "it's running!" };
  }
}
