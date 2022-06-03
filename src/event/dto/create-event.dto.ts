import { IsDate, IsString } from '@nestjs/class-validator';

export class CreateEventDto {
	@IsString()
	event_name: string;

	@IsDate()
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
	event_banner: string;
}
