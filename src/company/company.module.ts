import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { CompanyModel } from './company.model';
import { FileService } from 'src/file/file.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: CompanyModel,
				schemaOptions: {
					collection: 'companies',
				},
			},
		]),
	],
	controllers: [CompanyController],
	providers: [CompanyService, FileService],
	exports: [CompanyService],
})
export class CompanyModule {}
