import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { SocialItem } from './company.interface';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface CompanyModel extends Base {}
export class CompanyModel extends TimeStamps {
	@ApiProperty({ type: String })
	@prop()
	name: string;

	@ApiProperty({ type: String })
	@prop()
	slug: string;

	@ApiProperty({ type: String })
	@prop()
	web_site: string;

	@ApiProperty({ type: String })
	@prop()
	description: string;

	@ApiProperty()
	@prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'VacancyModel',
	})
	vacancies: mongoose.Types.ObjectId[];

	@ApiProperty()
	@prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'EventModel',
	})
	events: mongoose.Types.ObjectId[];

	@ApiProperty()
	@prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'VideoModel',
	})
	videos: mongoose.Types.ObjectId[];

	@ApiProperty()
	@prop()
	socials: SocialItem[];
}
