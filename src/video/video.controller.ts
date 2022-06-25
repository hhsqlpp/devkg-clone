import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { VideoModel } from './video.model';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { Auth } from 'src/auth/guards/auth.guard';

@ApiTags('Видео')
@Controller('videos')
export class VideoController {
	constructor(private videoService: VideoService) {}

	@Get()
	@ApiResponse({
		type: VideoModel,
		status: 200,
	})
	async getVideos(
		@Query('page') page: number,
		@Query('itemsPerPage') itemsPerPage: number,
	): Promise<VideoModel[]> {
		return this.videoService.getAll(page, itemsPerPage);
	}

	@Get(':slug')
	@ApiResponse({
		type: VideoModel,
		status: 200,
	})
	async getVideoBySlug(@Param('slug') slug: string): Promise<VideoModel> {
		return this.videoService.getBySlug(slug);
	}

	@Delete(':slug')
	@ApiResponse({
		type: VideoModel,
		status: 204,
	})
	@UseGuards(Auth)
	async deleteBySlug(@Param('slug') slug: string): Promise<VideoModel> {
		return this.videoService.delete(slug);
	}

	@Post('create')
	@HttpCode(201)
	@UsePipes(new ValidationPipe())
	@ApiResponse({
		type: VideoModel,
		status: 201,
	})
	@ApiBody({
		type: CreateVideoDto,
	})
	@UseGuards(Auth)
	async create(@Body() dto: CreateVideoDto): Promise<VideoModel> {
		return this.videoService.create(dto);
	}
}
