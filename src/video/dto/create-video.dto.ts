import { IsDateString, IsString } from '@nestjs/class-validator';

export class CreateVideoDto {
	@IsString()
	video_name: string;

	@IsDateString()
	date: Date;

	@IsString()
	author: string;

	@IsString()
	author_link: string;

	@IsString()
	video_link: string;

	@IsString()
	description: string;
}
