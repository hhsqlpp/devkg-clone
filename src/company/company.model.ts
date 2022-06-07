import { prop } from '@typegoose/typegoose';
import { EventModel } from '../event/event.model';
import { VacancyModel } from '../vacancy/vacancy.model';
import { VideoModel } from '../video/video.model';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { SocialItem } from './company.interface';

export interface CompanyModel extends Base {}
export class CompanyModel extends TimeStamps {
	@prop()
	name: string;

	@prop()
	slug: string;

	@prop()
	web_site: string;

	@prop()
	description: string;

	@prop()
	vacancies: VacancyModel[];

	@prop()
	events: EventModel[];

	@prop()
	videos: VideoModel[];

	@prop()
	socials: SocialItem[];
}
