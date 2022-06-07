import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface EventModel extends Base {}
export class EventModel extends TimeStamps {
	@prop()
	event_name: string;

	@prop()
	slug: string;

	@prop()
	date: Date;

	@prop()
	company_name: string;

	@prop()
	company_slug: string;

	@prop()
	location: string;

	@prop()
	event_link: string;

	@prop()
	description: string;

	@prop()
	event_banners: string[];
}
