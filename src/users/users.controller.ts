import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  get(): string {
    return this.service.getMany();
  }

  @Get('/{id}')
  getOne(@Param('id') id: number): string {
    return this.service.getOne(id);
  }
}
