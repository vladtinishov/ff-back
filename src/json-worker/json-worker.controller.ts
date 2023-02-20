import { Controller, Get } from '@nestjs/common';
import { JsonWorkerService } from './json-worker.service';

@Controller('json-worker')
export class JsonWorkerController {
  constructor(private readonly service: JsonWorkerService) {}

  @Get()
  get() {
    return this.service.create('users', 
    {
      "id": 1,
      "name": "Igor",
      "surname": "Tinishov",
      "login": "vlad.tinishov",
      "password": "top",
      "lang": "ru",
      "about": "Умный и талантливый разработчик ищет заказ своей мечты",
      "role": 1
    });
  }
}
