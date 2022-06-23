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
import {
	ApiBody,
	ApiCreatedResponse,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { CompanyModel } from './company.model';
import { Auth } from 'src/auth/guards/auth.guard';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/register-company.dto';

@ApiTags('Компании')
@Controller('companies')
export class CompanyController {
	constructor(private companyService: CompanyService) {}

	@Get()
	@ApiResponse({ type: CompanyModel, status: 200 })
	async getAllCompanies(
		@Query('page') page: number,
		@Query('itemsPerPage') itemsPerPage: number,
	) {
		return this.companyService.getAll(page, itemsPerPage);
	}

	@Get(':slug')
	@ApiResponse({ type: CompanyModel, status: 200 })
	async getCompanyBySlug(@Param('slug') slug: string) {
		return this.companyService.getBySlug(slug);
	}

	@Delete(':slug')
	@ApiResponse({ type: CompanyModel, status: 204 })
	@UseGuards(Auth)
	async deleteCompanyBySlug(@Param('slug') slug: string) {
		return this.companyService.deleteBySlug(slug);
	}

	@Post('register')
	@ApiBody({ type: RegisterCompanyDto })
	@ApiCreatedResponse({
		description: 'Company registered',
		type: CompanyModel,
	})
	@HttpCode(201)
	@UseGuards(Auth)
	@UsePipes(new ValidationPipe())
	async registerCompany(@Body() dto: RegisterCompanyDto) {
		return this.companyService.registerCompany(dto);
	}
}
