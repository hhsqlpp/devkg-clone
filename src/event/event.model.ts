import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface EventModel extends Base {}
export class EventModel extends TimeStamps {
	@ApiProperty({ type: String })
	@prop()
	event_name: string;

	@ApiProperty({ type: String })
	@prop()
	slug: string;

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
	location: string;

	@ApiProperty({ type: String })
	@prop()
	event_link: string;

	@ApiProperty({ type: String })
	@prop()
	description: string;

	@ApiProperty({ type: String })
	@prop()
	event_banners: string[];
}
