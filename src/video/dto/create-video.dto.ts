import { IsDateString, IsString } from '@nestjs/class-validator';

export class CreateVideoDto {
	@IsString()
	video_name: string;

	@IsDateString()
	date: Date;

	@IsString()
	company_name: string;

	@IsString()
	video_link: string;

	@IsString()
	description: string;
}
