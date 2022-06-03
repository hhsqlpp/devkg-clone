import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongodbConfig } from './config/mongo.config';
import { VacancyModule } from './vacancy/vacancy.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongodbConfig,
    }),
    VacancyModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
