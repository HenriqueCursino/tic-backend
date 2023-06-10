import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";

@Module({
    controllers: [ProductController],
    providers: [ProductService, PrismaService],
})
export class ProductModule {}
