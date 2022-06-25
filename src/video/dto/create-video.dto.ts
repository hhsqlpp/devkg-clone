import { IsDateString, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVideoDto {
	@ApiProperty({ type: String })
	@IsString()
	video_name: string;

	@ApiProperty({ type: Date })
	@IsDateString()
	date: Date;

	@ApiProperty({ type: String })
	@IsString()
	company_name: string;

	@ApiProperty({ type: String })
	@IsString()
	video_link: string;

	@ApiProperty({ type: String })
	@IsString()
	description: string;
}
