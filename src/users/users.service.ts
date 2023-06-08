import { HttpStatus, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Vehicle } from "src/vehicle/vehicle.entity";
import { In, Repository } from "typeorm";
import { Order } from "src/orders/order.entity";
import { CreateUserDto } from "./UserDTO";
import { IncompleteUserDto } from "./incomplete-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Vehicle)
        private readonly vehicleRepository: Repository<Vehicle>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) {}

    async create(userDto: CreateUserDto): Promise<User>
    {
        const user = this.userRepository.create();
        user.username = userDto.username
        user.fullname = userDto.fullname;
        user.password = userDto.password;
        user.mail = userDto.mail;
        user.phoneNumber = userDto.phoneNumber;

        const vehicles = await this.vehicleRepository.findBy({
            id: In(userDto.vehicles),
        });
        user.vehicles = vehicles;

        await this.userRepository.save(user);
        return user;
    }

    async findOne(id: number): Promise<User>
    {
        return this.userRepository.findOne({
            where: { id },
            relations: { orders: true, vehicles: true },
        });
    }

    async findAll(): Promise<User[]>
    {
        const users = await this.userRepository.find({
            relations: {
                orders: true,
                vehicles: true,
            },
        });

        return users;
    }

    async findIncomplete(): Promise<IncompleteUserDto[]>
    {
        const users = await this.userRepository.find();
        const IncompleteUsers: IncompleteUserDto[] = users.map((user) =>
        {
            const incompliteUser = new IncompleteUserDto();
            incompliteUser.id = user.id;
            incompliteUser.username = user.username;

            return incompliteUser
        });

        return IncompleteUsers;
    }

    async update(id: number, updatedUser: User)
    {
        const user = await this.userRepository.findOne({where: { id }})
        user.username = updatedUser.username;
        user.fullname = updatedUser.fullname;
        user.password = updatedUser.password;
        user.mail = updatedUser.mail;
        user.phoneNumber = updatedUser.phoneNumber;
        user.orders = updatedUser.orders;
        user.vehicles = updatedUser.vehicles;

        await this.userRepository.save(user);
        
        return user;
    }

    remove (id: number) {
        this.userRepository.delete({ id });
        return HttpStatus.OK;
    }
}