import { VehicleService } from "./vehicles.service";
import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Vehicle } from "./vehicle.entity";
import { CreateVehicleDto } from "./VehicleDTO";

@Controller('vehicles')
export class VehiclesController {
    constructor (private readonly vehiclesService: VehicleService) {}

    @Get()
    findAll() {
        return this.vehiclesService.findAll();
    }

    @Get('incomplete')
    findIncomplete() {
        return this.vehiclesService.findIncomplete();
    }

    @Get()
    findOne(@Param('id') id: string) {
        return this.vehiclesService.findOne(+id);
    }

    @Put(':id')
    update (@Param('id') id: string, @Body() updateVehicle: Vehicle) {
        return this.vehiclesService.update(+id, updateVehicle);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createVehicle: CreateVehicleDto) {
        return this.vehiclesService.create(createVehicle);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vehiclesService.remove(+id);
    }
}