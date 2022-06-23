import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { EventModel } from './event.model';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/guards/auth.guard';

@ApiTags('Мероприятия')
@Controller('events')
export class EventController {
	constructor(private eventService: EventService) {}

	@Get()
	async getAll(
		@Query('page') page: number,
		@Query('itemsPerPage') itemsPerPage: number,
	): Promise<EventModel[]> {
		return this.eventService.getAll(page, itemsPerPage);
	}

	@Get(':slug')
	async getBySlug(@Param('slug') slug: string): Promise<EventModel> {
		return this.eventService.getBySlug(slug);
	}

	@Delete(':slug')
	@UseGuards(Auth)
	async delete(@Param('slug') slug: string): Promise<EventModel> {
		return this.eventService.delete(slug);
	}

	@Post('create')
	@UseGuards(Auth)
	@UseInterceptors(FilesInterceptor('image'))
	@HttpCode(201)
	@UsePipes(new ValidationPipe())
	async create(
		@Body() dto: CreateEventDto,
		@UploadedFiles() files,
	): Promise<EventModel> {
		return this.eventService.create(dto, files);
	}
}
