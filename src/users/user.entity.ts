import { Order } from "src/orders/order.entity";
import { Vehicle } from "src/vehicle/vehicle.entity";
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column()
    fullname: string;

    @Column()
    mail: string;

    @Column()
    phoneNumber: string;

    @OneToMany((type) => Order, (order) => order.user)
    @JoinColumn ()
    orders: Order[];

    @OneToMany((type) => Vehicle, (vehicle) => vehicle.users)
    vehicles: Vehicle[];
}