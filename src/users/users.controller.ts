import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('/freelancers')
  getFreelancers() {
    return this.service.getFreelancers();
  }

  @Get('/freelancers/:id')
  getOneFreelancer(@Param('id') id: number) {
    return this.service.getOneFreelancer(id);
  }

  @Get('/:id')
  getOne(@Param('id') id: number): string {
    return this.service.getOne(id);
  }
}
