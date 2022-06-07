import { IsString, IsDateString } from '@nestjs/class-validator';

export class CreateEventDto {
	@IsString()
	event_name: string;

	@IsDateString()
	date: Date;

	@IsString()
	caller: string;

	@IsString()
	location: string;

	@IsString()
	event_link: string;

	@IsString()
	description: string;

	@IsString()
	company_name: string;
}
