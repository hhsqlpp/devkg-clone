import { ApiProperty } from '@nestjs/swagger';

export class SocialItem {
	@ApiProperty({ type: String })
	name: string;

	@ApiProperty({ type: String })
	link: string;
}
