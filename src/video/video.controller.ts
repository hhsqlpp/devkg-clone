import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoModel } from './video.model';

@Controller('videos')
export class VideoController {
	constructor(private videoService: VideoService) {}

	@Get()
	async getVideos(
		@Query('page') page: number,
		@Query('itemsPerPage') itemsPerPage: number,
	): Promise<VideoModel[]> {
		return this.videoService.getAll(page, itemsPerPage);
	}

	@Get(':slug')
	async getVideoBySlug(@Param('slug') slug: string): Promise<VideoModel> {
		return this.videoService.getBySlug(slug);
	}

	@Delete(':slug')
	async deleteBySlug(@Param('slug') slug: string): Promise<VideoModel> {
		return this.videoService.delete(slug);
	}

	@Post('create')
	@HttpCode(201)
	@UsePipes(new ValidationPipe())
	async create(@Body() dto: CreateVideoDto): Promise<VideoModel> {
		return this.videoService.create(dto);
	}
}
