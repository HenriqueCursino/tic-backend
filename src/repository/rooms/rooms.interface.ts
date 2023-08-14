import { rooms } from "@prisma/client";
import { createRoom } from "src/modules/rooms/rooms.dto";

export interface RoomRepository {
    getAllRooms(): Promise<rooms[]>
    getRoomByIdentfierKey(identifierKey: number): Promise<rooms>
    createRoom(data: createRoom): Promise<rooms>
}