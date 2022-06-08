import { IsEmail, IsString } from '@nestjs/class-validator';

export class AuthDto {
	@IsEmail()
	login: string;

	@IsString()
	password: string;
}
