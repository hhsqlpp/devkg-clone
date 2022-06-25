import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface VideoModel extends Base {}
export class VideoModel extends TimeStamps {
	@ApiProperty({ type: String })
	@prop()
	slug: string;

	@ApiProperty({ type: String })
	@prop()
	video_name: string;

	@ApiProperty({ type: Date })
	@prop()
	date: Date;

	@ApiProperty({ type: String })
	@prop()
	company_name: string;

	@ApiProperty({ type: String })
	@prop()
	company_slug: string;

	@ApiProperty({ type: String })
	@prop()
	video_link: string;

	@ApiProperty({ type: String })
	@prop()
	description: string;
}
