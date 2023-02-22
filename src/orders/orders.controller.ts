import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Get('/')
  getOrders() {
    return this.service.getMany();
  }

  @Get('/:id')
  getOrder(@Param('id') id: string) {
    return this.service.getOne(+id);
  }
}
