import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SocialItem } from '../company.interface';

export class RegisterCompanyDto {
	@ApiProperty({ type: String })
	@IsString()
	name: string;

	@ApiProperty({ type: String })
	@IsString()
	description: string;

	@ApiProperty({ type: String })
	@IsString()
	web_site: string;

	@ApiProperty({ type: String, required: false })
	socials?: SocialItem[];
}
