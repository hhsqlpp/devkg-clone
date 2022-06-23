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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/guards/auth.guard';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { SetIsHotDto } from './dto/set-is-hot.dto';
import { VacancyModel } from './vacancy.model';
import { VacancyService } from './vacancy.service';

@ApiTags('Вакансии')
@Controller('vacancies')
export class VacancyController {
	constructor(private vacancyService: VacancyService) {}

	@Get()
	@ApiResponse({
		type: VacancyModel,
		status: 200,
	})
	@HttpCode(200)
	async getAll(
		@Query('page') page: number,
		@Query('itemsPerPage') itemsPerPage: number,
	) {
		return this.vacancyService.getAll(page, itemsPerPage);
	}
	@ApiResponse({
		type: VacancyModel,
		status: 201,
	})
	@Post('create')
	@UseGuards(Auth)
	@HttpCode(201)
	async create(@Body() dto: CreateVacancyDto) {
		return this.vacancyService.create(dto);
	}

	@Get(':slug')
	@ApiResponse({
		type: VacancyModel,
		status: 200,
	})
	@HttpCode(200)
	async getBySlug(@Param('slug') slug: string) {
		return this.vacancyService.getBySlug(slug);
	}

	@Delete(':slug')
	@ApiResponse({
		type: VacancyModel,
		status: 204,
	})
	@UseGuards(Auth)
	async deleteBySlug(@Param('slug') slug: string) {
		return this.vacancyService.delete(slug);
	}

	@Put('hot/:slug')
	@ApiResponse({
		type: VacancyModel,
		status: 200,
	})
	@UsePipes(new ValidationPipe())
	async setIsHot(@Param('slug') slug: string, @Body() dto: SetIsHotDto) {
		return this.vacancyService.setIsHot(slug, dto);
	}
}
