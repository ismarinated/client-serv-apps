import { Injectable } from "@nestjs/common";
import { Order } from "src/orders/order.entity";
import { User } from "src/users/user.entity";
import { Vehicle } from "src/vehicle/vehicle.entity";

@Injectable ()
export class DatasourceService {
    private vehicles: Vehicle[] = [];
    getVehicles(): Vehicle[] {
        return this.vehicles;
    }

    private users: User[] = [];
    getUsers(): User[] {
        return this.users;
    }

    private orders: Order[] = [];
    getOrders(): Order[] {
        return this.orders;
    }
}