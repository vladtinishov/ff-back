import { Body, Controller, Get, Param, Post, UseGuards, Request, Delete, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/gurads/jwt-auth.guard';
import { ApplicationsService } from './applications.service';
import { ApplicationDto } from './dto/applications.dto';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly service: ApplicationsService) {}

  @Get()
  get(): string {
    return this.service.getMany();
  }

  @Get('/:id')
  getOne(@Param('id') id: string): string {
    return this.service.getOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() dto: ApplicationDto): string {
    return this.service.create(dto, req.user.id);
  }

  @Patch()
  // @UseGuards(JwtAuthGuard)
  edit(@Request() req, @Body() dto: ApplicationDto): string {
    return this.service.edit(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
