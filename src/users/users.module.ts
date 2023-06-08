import { Module } from "@nestjs/common";
import { DatasourceModule } from "src/datasource/datasource.module";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/users/user.entity";
import { Vehicle } from "src/vehicle/vehicle.entity";
import { Order } from "src/orders/order.entity";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        DatasourceModule,
        TypeOrmModule.forFeature ([ Order, User, Vehicle]),
    ],
})

export class UsersModule {}