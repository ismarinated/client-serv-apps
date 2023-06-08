import { User } from "src/users/user.entity";
import { Vehicle } from "src/vehicle/vehicle.entity";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    startDate: Date;
    @Column()
    expirationDate: Date;

    @ManyToOne((type) => User, (user) => user.orders)
    @JoinColumn ()
    user: User;

    @OneToOne((type) => Vehicle, (vehicle) => vehicle.orders)
    @JoinColumn()
    vehicle: Vehicle;
}