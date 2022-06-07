import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { EventModel } from './event.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ITEMS_PER_PAGE } from './event.constant';
import { CreateEventDto } from './dto/create-event.dto';
import slugify from 'slugify';
import { FileService } from 'src/file/file.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class EventService {
	constructor(
		@InjectModel(EventModel)
		private eventModel: ReturnModelType<typeof EventModel>,
		private fileService: FileService,
		private companyService: CompanyService,
	) {}

	async getAll(
		page: number = 1,
		itemsPerPage: number = ITEMS_PER_PAGE,
	): Promise<EventModel[]> {
		return await this.eventModel
			.find()
			.skip(page > 1 ? (page - 1) * itemsPerPage : 0)
			.limit(itemsPerPage);
	}

	async getBySlug(slug: string): Promise<EventModel> {
		const event = await this.eventModel.findOne({ slug });
		if (!event)
			throw new NotFoundException('Мероприятие с таким slug не найдено');

		return event;
	}

	async delete(slug: string): Promise<EventModel> {
		const event = await this.eventModel.findOneAndDelete({ slug });
		if (!event)
			throw new NotFoundException('Мероприятие с таким slug не найдено');

		return event;
	}

	async create(dto: CreateEventDto, files): Promise<EventModel> {
		const company = await this.companyService.getByName(dto.company_name);
		if (!company)
			throw new NotFoundException(
				'Компания с таким названием не существует',
			);

		const images = await this.fileService.saveFiles(files, 'events');

		const event = new this.eventModel({
			...dto,
			event_banners: images,
			company_name: company.name,
			company_slug: company.slug,
		});

		event.slug = slugify(`${dto.event_name} ${dto.caller} ${event._id}`, {
			replacement: '-',
			remove: undefined,
			lower: true,
			strict: false,
			locale: 'vi',
			trim: true,
		});

		company.events.push(event._id);
		this.companyService.editCompany(company, company.slug);

		return await event.save();
	}
}
