import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { VacancyModel } from './vacancy.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: VacancyModel,
        schemaOptions: {
          collection: 'vacancies',
        }
      }
    ])
  ],
  controllers: [VacancyController],
  providers: [VacancyService]
})
export class VacancyModule {}
