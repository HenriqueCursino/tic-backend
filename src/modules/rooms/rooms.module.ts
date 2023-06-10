import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RoomsController } from "./rooms.controller";
import { RoomService } from "./rooms.service";

@Module({
    controllers: [RoomsController],
    providers: [RoomService, PrismaService],
})
export class RoomModule {}
