import { Injectable } from '@nestjs/common';
import { JsonWorkerService } from 'src/json-worker/json-worker.service';
import { OrderDto } from './dto/order.dto';

const TABLE_NAME = 'orders'

@Injectable()
export class OrdersService {
  constructor(
    private readonly jsonWorkerService: JsonWorkerService,
  ) {}

  getMany(): OrderDto[] {
    // todo сделать провреку, что заказ ещё не взят
    let res = this.jsonWorkerService.getMany(TABLE_NAME);
    return this.jsonWorkerService.leftJoin(res, 'users', 'customerId', 'id')
  }

  getOne(id: number): OrderDto {
    // todo сделать провреку, что заказ ещё не взят
    let res = this.jsonWorkerService.getMany(TABLE_NAME, { id });
    return this.jsonWorkerService.leftJoin(res, 'users', 'customerId', 'id')[0]
  }
}
