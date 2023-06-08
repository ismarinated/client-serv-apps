import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullname: string;

    @IsEmail()
    @IsNotEmpty()
    mail: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phoneNumber:string;
    
    vehicles: number[];
}