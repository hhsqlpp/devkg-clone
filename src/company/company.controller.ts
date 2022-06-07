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
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/register-company.dto';

@Controller('companies')
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	@Get()
	async getAllCompanies(
		@Query('page') page: number,
		@Query('itemsPerPage') itemsPerPage: number,
	) {
		return this.companyService.getAll(page, itemsPerPage);
	}

	@Get(':slug')
	async getCompanyBySlug(@Param('slug') slug: string) {
		return this.companyService.getBySlug(slug);
	}

	@Delete(':slug')
	async deleteCompanyBySlug(@Param('slug') slug: string) {
		return this.companyService.deleteBySlug(slug);
	}

	@Post('register')
	@HttpCode(201)
	@UsePipes(new ValidationPipe())
	async registerCompany(@Body() dto: RegisterCompanyDto) {
		return this.companyService.registerCompany(dto);
	}
}
