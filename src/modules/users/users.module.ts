import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { EntityMapper } from "./users.entity";

@Module({
    controllers: [UsersController],
    providers: [UsersService, PrismaService, EntityMapper],
})
export class UsersModule {}
