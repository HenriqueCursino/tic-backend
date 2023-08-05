import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RoomsController } from "./rooms.controller";
import { RoomService } from "./rooms.service";
import { EntityMapper } from "./rooms.entity";

@Module({
    controllers: [RoomsController],
    providers: [RoomService, PrismaService, EntityMapper],
})
export class RoomModule {}
