import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventController {
	constructor(private eventService: EventService) {}

	@Get()
	async getAll(
		@Query('count') count: number,
		@Query('offset') offset: number,
	) {
		return this.eventService.getAll(count, offset);
	}

	@Get(':slug')
	async getBySlug(@Param('slug') slug: string) {
		return this.eventService.getBySlug(slug);
	}

	@Delete(':slug')
	async delete(@Param('slug') slug: string) {
		return this.eventService.delete(slug);
	}

	@Post('create')
	@HttpCode(201)
	async create(@Body() dto: CreateEventDto) {
		return this.eventService.create(dto);
	}
}
