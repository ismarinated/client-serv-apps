import { Controller, Get, Param, Put, Body, Post, Delete, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./UserDTO";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get('incomplete')
    findIncomplete() {
        this.usersService.findIncomplete();
    }

    @Get()
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Put(':id')
    update (@Param('id') id: string, @Body() updateUser: User) {
        return this.usersService.update(+id, updateUser);
    }

    @Post()
    create(@Body() createUser: CreateUserDto) {
        return this.usersService.create(createUser);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}