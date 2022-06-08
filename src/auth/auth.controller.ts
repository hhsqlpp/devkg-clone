import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() login: string) {
		return this.authService.login(login);
	}
}
