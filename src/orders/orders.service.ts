import { Injectable } from '@nestjs/common';
import { JsonWorkerService } from 'src/json-worker/json-worker.service';
import { OrderDto, OrderUserDto } from './dto/order.dto';
import { SendOrderDto } from './dto/send-order.dto';
import { SetApproveDto } from './dto/set-approve.dto';

const TABLE_NAME = 'orders'

@Injectable()
export class OrdersService {
  constructor(
    private readonly jsonWorkerService: JsonWorkerService,
  ) {}

  getMany(): OrderDto[] {
    // todo сделать провреку, что заказ ещё не взят
    let res = this.jsonWorkerService.getMany(TABLE_NAME);
    res = this.jsonWorkerService.leftJoin(res, 'ordersUsers', 'id', 'orderId')
    return this.jsonWorkerService.leftJoin(res, 'users', 'customerId', 'id')
  }

  getOne(id: number): OrderDto {
    // todo сделать провреку, что заказ ещё не взят
    let res = this.jsonWorkerService.getMany(TABLE_NAME, { id });
    res = this.jsonWorkerService.leftJoin(res, 'users', 'customerId', 'id')
    return this.jsonWorkerService.leftJoin(res, 'ordersUsers', 'id', 'orderId')[0]
  }

  create(dto: OrderDto) {
    // todo сделать провреку, что заказ ещё не взят
    return this.jsonWorkerService.create(TABLE_NAME, dto);
  }

  createOrderUser(dto: SendOrderDto) {
    const orderUser: OrderUserDto = {
      isApproved: dto.fromCustomer ? true : false,
      isApprovedByFreelancer: dto.fromCustomer ? false : true,
      isClosed: false,
      likes: 0,
      orderId: dto.orderId,
      userId: dto.freelancerId
    }

    const order = this.getOne(dto.orderId)
    order.isTaked = true

    this.jsonWorkerService.create('ordersUsers', orderUser);
    if (dto.fromCustomer) {
      return this.jsonWorkerService.edit(TABLE_NAME, order, { id: order.id });
    }
  }

  setApprove(dto: SetApproveDto) {
    const userOrder: OrderUserDto = this.jsonWorkerService.findOne('ordersUsers', { userId: dto.freelancerId, orderId: dto.id }); 
    const order: OrderDto = this.jsonWorkerService.findOne(TABLE_NAME, { id: dto.id }); 

    if (dto.fromCustomer) userOrder.isApproved = true
    else userOrder.isApprovedByFreelancer = true
    order.isTaked = true

    this.jsonWorkerService.edit('ordersUsers', userOrder, { id: userOrder.id });
    return this.jsonWorkerService.edit(TABLE_NAME, order, { id: order.id });
  }

  edit(dto: OrderDto) {
    return this.jsonWorkerService.edit(TABLE_NAME, dto, { id: dto.id })
  }

  delete(id: number) {
    return this.jsonWorkerService.delete(TABLE_NAME, { id })
  }
}
