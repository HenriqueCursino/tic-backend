import { Module } from '@nestjs/common';
import { RoomCategory } from './modules/category/category.module';
import { OriginModule } from './modules/origin/origin.module';
import { ProductModule } from './modules/products/products.module';
import { RoomModule } from './modules/rooms/rooms.module';
import { UsersModule } from './modules/users/users.module';
import { HealthService } from './modules/health/health.service';
import { HealthController } from './modules/health/health.controller';
import { UserRepositoryModule } from './repository/users/users.module';
import { RoomRepositoryModule } from './repository/rooms/rooms.module';
import { ProductsRepositoryModule } from './repository/products/products.module';
import { CategoryRepositoryModule } from './repository/category/category.module';
import { OriginRepositoryModule } from './repository/origin/origin.module';

@Module({
  imports: [
    UsersModule,
    UserRepositoryModule,
    RoomModule,
    RoomRepositoryModule,
    OriginModule,
    OriginRepositoryModule,
    RoomCategory,
    CategoryRepositoryModule,
    ProductModule,
    ProductsRepositoryModule,
  ],
  providers: [HealthService],
  controllers: [HealthController],
})
export class AppModule {}
