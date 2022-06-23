import { IsEmail, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
	@ApiProperty({ type: String, description: 'email' })
	@IsEmail()
	login: string;

	@ApiProperty({ type: String, description: 'password' })
	@IsString()
	password: string;
}
