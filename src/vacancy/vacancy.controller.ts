import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/guards/auth.guard';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { SetIsHotDto } from './dto/set-is-hot.dto';
import { VacancyService } from './vacancy.service';

@Controller('vacancies')
export class VacancyController {
	constructor(private vacancyService: VacancyService) {}

	@Get()
	@HttpCode(200)
	@UseGuards(Auth)
	async getAll(
		@Query('page') page: number,
		@Query('itemsPerPage') itemsPerPage: number,
	) {
		return this.vacancyService.getAll(page, itemsPerPage);
	}

	@Post('create')
	@HttpCode(201)
	async create(@Body() dto: CreateVacancyDto) {
		return this.vacancyService.create(dto);
	}

	@Get(':slug')
	@HttpCode(200)
	async getBySlug(@Param('slug') slug: string) {
		return this.vacancyService.getBySlug(slug);
	}

	@Delete(':slug')
	async deleteBySlug(@Param('slug') slug: string) {
		return this.vacancyService.delete(slug);
	}

	@Put('hot/:slug')
	@UsePipes(new ValidationPipe())
	async setIsHot(@Param('slug') slug: string, @Body() dto: SetIsHotDto) {
		return this.vacancyService.setIsHot(slug, dto);
	}
}
