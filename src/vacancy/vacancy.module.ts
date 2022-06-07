import { Module } from '@nestjs/common';
import { VacancyController } from './vacancy.controller';
import { VacancyService } from './vacancy.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { VacancyModel } from './vacancy.model';
import { CompanyModule } from 'src/company/company.module';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: VacancyModel,
				schemaOptions: {
					collection: 'vacancies',
				},
			},
		]),
		CompanyModule,
	],
	controllers: [VacancyController],
	providers: [VacancyService],
})
export class VacancyModule {}
