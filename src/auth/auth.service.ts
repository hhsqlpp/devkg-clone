import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthDto } from './dto/auth.dto';
import { UserModel } from './user.model';
import { genSaltSync, hashSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel)
		private userModel: ReturnModelType<typeof UserModel>,
		private jwtService: JwtService,
	) {}

	async register(dto: AuthDto) {
		const salt = genSaltSync(10);
		const passwordHash = hashSync(dto.password, salt);
		const newUser = await this.userModel.create({
			...dto,
			password: passwordHash,
		});

		return {
			access_token: await this.jwtService.signAsync({
				login: newUser.login,
			}),
		};
	}

	async login(login: string) {
		const payload = { login };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
