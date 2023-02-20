import { Controller, Get, Param } from '@nestjs/common';
import { ApplicationsService } from './applications.service';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  // @Get()
  // get(): string {
  //   return this.service.getMany();
  // }

  // @Get('/{id}')
  // getOne(@Param('id') id: number): string {
  //   return this.service.getOne(id);
  // }
}
