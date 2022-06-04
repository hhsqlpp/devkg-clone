import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { EventModel } from './event.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ITEMS_PER_PAGE } from './event.constant';
import { CreateEventDto } from './dto/create-event.dto';
import slugify from 'slugify';
import { FileService } from 'src/file/file.service';

@Injectable()
export class EventService {
	constructor(
		@InjectModel(EventModel)
		private eventModel: ReturnModelType<typeof EventModel>,
		private fileService: FileService,
	) {}

	async getAll(
		count: number = ITEMS_PER_PAGE,
		offset: number = 0,
	): Promise<EventModel[]> {
		return await this.eventModel.find().skip(offset).limit(count);
	}

	async getBySlug(slug: string): Promise<EventModel> {
		return await this.eventModel.findOne({ slug });
	}

	async delete(slug: string): Promise<EventModel> {
		return await this.eventModel.findOneAndDelete({ slug });
	}

	async create(dto: CreateEventDto, files): Promise<EventModel> {
		const images = await this.fileService.saveFiles(files, 'events');

		const event = new this.eventModel({ ...dto, event_banners: images });

		event.slug = slugify(`${dto.event_name} ${dto.caller} ${event._id}`, {
			replacement: '-',
			remove: undefined,
			lower: true,
			strict: false,
			locale: 'vi',
			trim: true,
		});

		return await event.save();
	}
}
