import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface VideoModel extends Base {}
export class VideoModel extends TimeStamps {
	@prop()
	slug: string;

	@prop()
	video_name: string;

	@prop()
	date: Date;

	@prop()
	company_name: string;

	@prop()
	company_slug: string;

	@prop()
	video_link: string;

	@prop()
	description: string;
}
