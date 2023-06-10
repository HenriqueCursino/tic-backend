import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { OriginController } from "./origin.controller";
import { OriginService } from "./origin.service";

@Module({
    controllers: [OriginController],
    providers: [OriginService, PrismaService],
})
export class OriginModule {}
