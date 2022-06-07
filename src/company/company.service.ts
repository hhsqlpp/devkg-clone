import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CompanyModel } from './company.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { RegisterCompanyDto } from './dto/register-company.dto';
import slugify from 'slugify';
import { ITEMS_PER_PAGE } from './company.constants';

@Injectable()
export class CompanyService {
	constructor(
		@InjectModel(CompanyModel)
		private companyModel: ReturnModelType<typeof CompanyModel>,
	) {}

	async registerCompany(dto: RegisterCompanyDto): Promise<CompanyModel> {
		const newCompany = await this.companyModel.create({ ...dto });
		newCompany.slug = slugify(`${dto.name} ${newCompany._id}`, {
			replacement: '-',
			remove: undefined,
			lower: true,
			strict: false,
			locale: 'vi',
			trim: true,
		});

		return await newCompany.save();
	}

	async getAll(
		page: number = 1,
		itemsPerPage: number = ITEMS_PER_PAGE,
	): Promise<CompanyModel[]> {
		const companies = await this.companyModel
			.find()
			.skip(page > 1 ? (page - 1) * itemsPerPage : 0)
			.limit(itemsPerPage);

		return companies;
	}

	async getBySlug(slug: string): Promise<CompanyModel> {
		const company = await this.companyModel
			.findOne({ slug })
			.populate('vacancies', 'videos', 'events');
		if (!company)
			throw new NotFoundException('Компания с таким slug не найдено');

		return company;
	}

	async getByName(name: string): Promise<CompanyModel> {
		const company = await this.companyModel.findOne({ name });
		if (!company)
			throw new NotFoundException(
				'Компания с таким названием не найдено',
			);

		return company;
	}

	async getById(id: string): Promise<CompanyModel> {
		const company = await this.companyModel.findOne({ _id: id });
		if (!company)
			throw new NotFoundException('Компания с таким id не найдено');

		return company;
	}

	async deleteBySlug(slug: string): Promise<CompanyModel> {
		const company = await this.companyModel.findOneAndDelete({ slug });
		if (!company)
			throw new NotFoundException('Компания с таким slug не найдено');

		return company;
	}
}
