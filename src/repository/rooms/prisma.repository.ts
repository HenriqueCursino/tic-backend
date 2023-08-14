import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RoomRepository } from "./rooms.interface";
import { rooms } from "@prisma/client";
import { createRoom } from "src/modules/rooms/rooms.dto";

@Injectable()
export class PrismaRoomRepository implements RoomRepository {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getAllRooms(): Promise<rooms[]> {
        return await this.prisma.rooms.findMany();
    }

    async getRoomByIdentfierKey(identifierKey: number): Promise<rooms> {
        return await this.prisma.rooms.findFirst({
            where: {
              identfier_key: identifierKey
            }
        })
    }

    async createRoom(data: createRoom): Promise<rooms> {
        return await this.prisma.rooms.create({
            data: {
              name: data.name,
              identfier_key: data.identfier_key
            }
        })
    }
}
