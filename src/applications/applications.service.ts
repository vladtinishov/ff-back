import { Injectable, UseGuards } from '@nestjs/common';
import { JsonWorkerService } from 'src/json-worker/json-worker.service';
import { ApplicationDto } from './dto/applications.dto';

const TABLE_NAME = 'applications'

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly jsonWorkerService: JsonWorkerService,
  ) {}

  getMany(): string {
    return this.jsonWorkerService.getMany(TABLE_NAME);
  }

  getOne(id: number): string {
    return this.jsonWorkerService.findOne(TABLE_NAME, { id });
  }

  create(dto: ApplicationDto, userId: number) {
    dto.userId = userId
    return this.jsonWorkerService.create(TABLE_NAME, dto)
  }

  edit(dto: ApplicationDto) {
    return this.jsonWorkerService.edit(TABLE_NAME, dto, { id: dto.id })
  }

  delete(id: number) {
    return this.jsonWorkerService.delete(TABLE_NAME, { id })
  }

}
