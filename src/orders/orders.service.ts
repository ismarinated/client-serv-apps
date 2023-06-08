import { HttpStatus, Injectable } from "@nestjs/common";
import { Order } from "./order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Vehicle } from "src/vehicle/vehicle.entity";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { CreateOrderDto } from "./OrderDTO";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async create(orderDto: CreateOrderDto): Promise<Order>
    {
        const order = this.orderRepository.create();
        order.startDate = orderDto.startDate;
        order.expirationDate = orderDto.expirationDate;

        await this.orderRepository.save(order);
        return order;
    }

    async findOne(id: number): Promise<Order>
    {
        return this.orderRepository.findOne({
            where: { id },
            relations: {
                user: true,
                vehicle: true
            },
        });
    }

    async findAll(): Promise<Order[]>
    {
        const orders = await this.orderRepository.find({
            relations: {
                user: true,
                vehicle: true
            },
        });

        return orders;
    }

    async update(id: number, updatedOrder: Order)
    {
        const order = await this.orderRepository.findOne({where: { id }})
        order.startDate = updatedOrder.startDate;
        order.expirationDate = updatedOrder.expirationDate;

        await this.orderRepository.save(order);
        
        return order;
    }

    remove (id: number) {
        this.orderRepository.delete({ id });
        return HttpStatus.OK;
    }
}