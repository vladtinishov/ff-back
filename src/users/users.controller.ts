import { Controller, Get, Param } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
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
  getOne(@Param('id') id: number): UserDto {
    return this.service.getOne(id);
  }
}
