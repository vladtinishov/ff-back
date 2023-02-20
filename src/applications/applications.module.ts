import { Module } from '@nestjs/common';
import { JsonWorkerModule } from 'src/json-worker/json-worker.module';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  controllers: [ApplicationsController],
  providers: [ApplicationsService]
})
export class ApplicationsModule {}
