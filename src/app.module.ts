import { Module } from '@nestjs/common';
import { RoomCategory } from './modules/category/category.module';
import { OriginModule } from './modules/origin/origin.module';
import { ProductModule } from './modules/products/products.module';
import { RoomModule } from './modules/rooms/rooms.module';
import { UsersModule } from './modules/users/users.module';
import { HealthService } from './health/health.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [UsersModule, RoomModule, OriginModule, RoomCategory, ProductModule],
  providers: [HealthService],
  controllers: [HealthController],
})
export class AppModule {}
