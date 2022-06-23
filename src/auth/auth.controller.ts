import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('register')
	@ApiCreatedResponse({ description: 'User registration' })
	@ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
	@ApiBody({ type: AuthDto })
	@UsePipes(new ValidationPipe())
	async register(@Body() dto: AuthDto) {
		return this.authService.register(dto);
	}

	@Post('login')
	@ApiCreatedResponse({ description: 'User login' })
	@ApiOkResponse({ description: 'User login' })
	@ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
	@ApiBody({ type: AuthDto })
	@UsePipes(new ValidationPipe())
	async login(@Body() login: string) {
		return this.authService.login(login);
	}
}
