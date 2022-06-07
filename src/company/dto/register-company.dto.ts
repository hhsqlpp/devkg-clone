import { IsString } from '@nestjs/class-validator';
import { SocialItem } from '../company.interface';

export class RegisterCompanyDto {
	@IsString()
	name: string;

	@IsString()
	description: string;

	@IsString()
	web_site: string;

	socials?: SocialItem[];
}
