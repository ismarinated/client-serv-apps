import { IsNotEmpty, IsString } from "class-validator";

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    bikeType: string;

    @IsString()
    brandCountry: string;
}