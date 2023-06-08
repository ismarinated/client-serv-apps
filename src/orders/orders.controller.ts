import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { Order } from "./order.entity";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./OrderDTO";

@Controller('orders')
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) {}

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get()
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(+id);
    }

    @Put(':id')
    update (@Param('id') id: string, @Body() updateOrder: Order) {
        return this.ordersService.update(+id, updateOrder);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() createOrder: CreateOrderDto) {
        return this.ordersService.create(createOrder);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }
}