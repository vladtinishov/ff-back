import { Global, Module } from '@nestjs/common';
import { JsonWorkerController } from './json-worker.controller';
import { JsonWorkerService } from './json-worker.service';

@Global()
@Module({
  controllers: [JsonWorkerController],
  providers: [JsonWorkerService],
  exports: [JsonWorkerService]
})
export class JsonWorkerModule {}
