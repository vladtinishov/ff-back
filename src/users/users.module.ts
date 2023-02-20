import { Module } from '@nestjs/common';
import { JsonWorkerModule } from 'src/json-worker/json-worker.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [JsonWorkerModule],
  exports: [UsersService]
})
export class UsersModule {}
