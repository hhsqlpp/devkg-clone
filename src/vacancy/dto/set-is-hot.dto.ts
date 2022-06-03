import { IsBoolean } from '@nestjs/class-validator';

export class SetIsHotDto {
	@IsBoolean()
	is_hot: boolean;
}
