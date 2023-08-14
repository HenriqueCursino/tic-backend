import { users } from "@prisma/client";
import { createUser } from "src/modules/users/users.dto";

export interface UserRepository {
    getAllUsers(): Promise<users[]> 
    getUserByEmail(email: string): Promise<users>
    getUserByHash(hash: string): Promise<users>
    deleteUser(id: number): Promise<users>
    createUser(data: createUser): Promise<users>
}