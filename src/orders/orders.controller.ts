import { Body, Controller, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { SendOrderDto } from './dto/send-order.dto';
import { SetApproveDto } from './dto/set-approve.dto';
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

  @Post()
  create(@Body() dto: OrderDto) {
    return this.service.create(dto);
  }

  @Post('/set-order-user')
  createOrderUser(@Body() dto: SendOrderDto) {
    return this.service.createOrderUser(dto);
  }

  @Patch('/set-approve')
  setApprove(@Body() dto: SetApproveDto) {
    return this.service.setApprove(dto);
  }

  @Patch()
  edit(@Body() dto: OrderDto): string {
    return this.service.edit(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
