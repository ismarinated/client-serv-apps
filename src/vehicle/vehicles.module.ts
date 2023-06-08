import { Module } from "@nestjs/common";
import { DatasourceModule } from "src/datasource/datasource.module";
import { VehiclesController } from "./vehicles.controller";
import { VehicleService } from "./vehicles.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/users/user.entity";
import { Vehicle } from "src/vehicle/vehicle.entity";
import { Order } from "src/orders/order.entity";

@Module ({
    controllers: [VehiclesController],
    providers: [VehicleService],
    imports: [
        DatasourceModule,
        TypeOrmModule.forFeature ([ Order, User, Vehicle]),
    ],
})

export class VehiclesModule {}