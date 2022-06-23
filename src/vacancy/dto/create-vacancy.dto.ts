import { IsString, IsEmail, IsBoolean } from '@nestjs/class-validator';
import { Salary, WorkEnum } from '../vacancy.interface';

export class CreateVacancyDto {
	@IsString()
	position: string;

	@IsString()
	type: WorkEnum;

	salary: Salary;

	@IsString()
	description: string;

	@IsString()
	telegram: string;

	@IsEmail()
	email: string;

	@IsString()
	company_name: string;

	@IsBoolean()
	is_hot: boolean = false;
}
