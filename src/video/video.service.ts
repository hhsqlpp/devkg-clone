import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import slugify from 'slugify';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoModel } from './video.model';
import { ITEMS_PER_PAGE } from './video.constants';

@Injectable()
export class VideoService {
	constructor(
		@InjectModel(VideoModel)
		private videoModel: ReturnModelType<typeof VideoModel>,
	) {}

	async getAll(
		page: number = 1,
		itemsPerPage: number = ITEMS_PER_PAGE,
	): Promise<VideoModel[]> {
		return await this.videoModel
			.find()
			.skip(page > 1 ? (page - 1) * itemsPerPage : 0)
			.limit(itemsPerPage);
	}

	async getBySlug(slug: string): Promise<VideoModel> {
		const vacancy = await this.videoModel.findOne({ slug });
		if (!vacancy)
			throw new NotFoundException('Видео по такому slug не найдено');

		return vacancy;
	}

	async delete(slug: string): Promise<VideoModel> {
		const vacancy = await this.videoModel.findOneAndDelete({ slug });
		if (!vacancy)
			throw new NotFoundException('Видео по такому slug не найдено');

		return vacancy;
	}

	async create(dto: CreateVideoDto): Promise<VideoModel> {
		const video = await this.videoModel.create({ ...dto });
		video.slug = slugify(`${dto.video_name} ${dto.author} ${video._id}`, {
			replacement: '-',
			remove: undefined,
			lower: true,
			strict: false,
			locale: 'vi',
			trim: true,
		});

		return await video.save();
	}
}
