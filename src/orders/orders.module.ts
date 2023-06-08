import { Module } from "@nestjs/common";
import { DatasourceModule } from "src/datasource/datasource.module";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/users/user.entity";
import { Order } from "./order.entity";
import { Vehicle } from "src/vehicle/vehicle.entity";

@Module({
    controllers: [OrdersController],
    providers: [OrdersService],
    imports: [
        DatasourceModule,
        TypeOrmModule.forFeature ([ Order, User, Vehicle]),
    ],
})
export class OrdersModule {}