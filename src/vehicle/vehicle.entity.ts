import { Order } from "src/orders/order.entity";
import { User } from "src/users/user.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ unique: true })
    model: string;
    @Column()
    brand: string;
    @Column()
    bikeType: string;
    @Column()
    brandCountry: string;

    @OneToOne((type) => Order, (order) => order.vehicle)
    @JoinColumn ()
    orders: Order;

    @ManyToOne((type) => User, (user) => user.vehicles)
    users: User;
}