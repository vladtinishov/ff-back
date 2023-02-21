import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration } from 'config/configuration';
import { AppController } from './app.controller';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { JsonWorkerModule } from './json-worker/json-worker.module';
import { ApplicationsModule } from './applications/applications.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';
import { AchievementsModule } from './achievements/achievements.module';
import { SpecializationsModule } from './specializations/specializations.module';

@Module({
  imports: [
    UsersModule, 
    MailModule, 
    JsonWorkerModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }), 
    JsonWorkerModule, 
    ApplicationsModule, 
    OrdersModule,
    AuthModule,
    AchievementsModule,
    SpecializationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
