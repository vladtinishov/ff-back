import { Injectable } from '@nestjs/common';
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

  create(dto: ApplicationDto) {
    return this.jsonWorkerService.create(TABLE_NAME, dto)
  }

}
