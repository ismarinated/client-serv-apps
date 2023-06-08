import { HttpStatus, Injectable } from "@nestjs/common";
import { Vehicle } from "./vehicle.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/users/user.entity";
import { Order } from "src/orders/order.entity";
import { CreateVehicleDto } from "./VehicleDTO";
import { IncompleteVehicleDto } from "./incomplete-model.dto";

@Injectable()
export class VehicleService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async create(vehicleDto: CreateVehicleDto): Promise<Vehicle>
    {
        const vehicle = this.vehicleRepository.create();
        vehicle.model = vehicleDto.model;
        vehicle.brand = vehicleDto.brand;
        vehicle.bikeType = vehicleDto.bikeType;
        vehicle.brandCountry = vehicleDto.brandCountry;

        await this.vehicleRepository.save(vehicle);
        return vehicle;
    }

    async findOne(id: number): Promise<Vehicle>
    {
        return this.vehicleRepository.findOne({
            where: { id },
            relations: { orders: true },
        });
    }

    async findAll(): Promise<Vehicle[]>
    {
        const vehicles = await this.vehicleRepository.find({
            relations: {
                orders: true,
            },
        });

        return vehicles;
    }

    async findIncomplete(): Promise<IncompleteVehicleDto[]>
    {
        const vehicles = await this.vehicleRepository.find();
        const IncompleteVehicles: IncompleteVehicleDto[] = vehicles.map((vehicle) =>
        {
            const incompliteVehicle = new IncompleteVehicleDto();
            incompliteVehicle.id = vehicle.id;
            incompliteVehicle.model = vehicle.model;
            incompliteVehicle.brand = vehicle.brand;

            return incompliteVehicle
        });

        return IncompleteVehicles;
    }

    async update(id: number, updatedVehicle: Vehicle)
    {
        const vehicle = await this.vehicleRepository.findOne( {where: { id } })
        vehicle.model = updatedVehicle.model;
        vehicle.brand = updatedVehicle.brand;
        vehicle.bikeType = updatedVehicle.bikeType;
        vehicle.brandCountry = updatedVehicle.brandCountry;
        vehicle.orders = updatedVehicle.orders;

        await this.vehicleRepository.save(vehicle);
        
        return vehicle;
    }

    remove (id: number) {
        this.vehicleRepository.delete({ id });
        return HttpStatus.OK;
    }
}