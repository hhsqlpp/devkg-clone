import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { SocialItem } from './company.interface';
import mongoose from 'mongoose';

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

	@prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'VacancyModel',
	})
	vacancies: mongoose.Types.ObjectId[];

	@prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'EventModel',
	})
	events: mongoose.Types.ObjectId[];

	@prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'VideoModel',
	})
	videos: mongoose.Types.ObjectId[];

	@prop()
	socials: SocialItem[];
}
