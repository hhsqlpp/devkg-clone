import { IsString, IsDateString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
	@ApiProperty({ type: String })
	@IsString()
	event_name: string;

	@ApiProperty({ type: Date })
	@IsDateString()
	date: Date;

	@ApiProperty({ type: String })
	@IsString()
	caller: string;

	@ApiProperty({ type: String })
	@IsString()
	location: string;

	@ApiProperty({ type: String })
	@IsString()
	event_link: string;

	@ApiProperty({ type: String })
	@IsString()
	description: string;

	@ApiProperty({ type: String })
	@IsString()
	company_name: string;
}
