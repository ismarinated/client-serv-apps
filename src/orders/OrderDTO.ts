import { IsDate, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    expirationDate: Date;
}