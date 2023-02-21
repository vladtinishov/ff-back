import { Injectable } from '@nestjs/common';
import { JsonWorkerService } from 'src/json-worker/json-worker.service';

@Injectable()
export class AchievementsService {
  constructor(
    private readonly jsonWorkerService: JsonWorkerService,
  ) {}

}
