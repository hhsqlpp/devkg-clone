import { IsString, IsEmail, IsBoolean } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Salary, WorkEnum } from '../vacancy.interface';

export class CreateVacancyDto {
	@ApiProperty({ type: String })
	@IsString()
	position: string;

	@ApiProperty({ type: String })
	@IsString()
	type: WorkEnum;

	salary: Salary;

	@ApiProperty({ type: String })
	@IsString()
	description: string;

	@ApiProperty({ type: String })
	@IsString()
	telegram: string;

	@ApiProperty({ type: String })
	@IsEmail()
	email: string;

	@ApiProperty({ type: String })
	@IsString()
	company_name: string;

	@ApiProperty({ type: Boolean })
	@IsBoolean()
	is_hot: boolean = false;
}
