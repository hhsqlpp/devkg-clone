import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { VacancyService } from './vacancy.service';

@Controller('vacancies')
export class VacancyController {
  constructor(private vacancyService: VacancyService) {}

  @Get()
  async getAll(@Query('hot') hot: 'true' | 'false') {
    if (hot == 'true') {
      return this.vacancyService.getHotVacancies();
    }

    return this.vacancyService.getAll();
  }

  @Post('create')
  async create(@Body() dto: CreateVacancyDto) {
    return this.vacancyService.create(dto);
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.vacancyService.getBySlug(slug);
  }
}
