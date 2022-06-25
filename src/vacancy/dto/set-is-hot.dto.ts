import { IsBoolean } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetIsHotDto {
	@ApiProperty({ type: Boolean })
	@IsBoolean()
	is_hot: boolean;
}
