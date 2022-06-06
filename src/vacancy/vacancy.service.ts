import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { VacancyModel } from './vacancy.model';
import slugify from 'slugify';
import { SetIsHotDto } from './dto/set-is-hot.dto';
import { ITEMS_PER_PAGE } from './vacancy.constant';

@Injectable()
export class VacancyService {
	constructor(
		@InjectModel(VacancyModel)
		private vacancyModel: ReturnModelType<typeof VacancyModel>,
	) {}

	async create(dto: CreateVacancyDto): Promise<VacancyModel> {
		const vacancy = await this.vacancyModel.create({ ...dto });
		vacancy.slug = slugify(
			`${dto.position} ${dto.company_name} ${vacancy._id}`,
			{
				replacement: '-',
				remove: undefined,
				lower: true,
				strict: false,
				locale: 'vi',
				trim: true,
			},
		);

		return vacancy.save();
	}

	async getAll(
		page: number = 1,
		itemsPerPage: number = ITEMS_PER_PAGE,
	): Promise<VacancyModel[]> {
		const vacancies = await this.vacancyModel
			.find()
			.skip(page > 1 ? (page - 1) * itemsPerPage : 0)
			.limit(itemsPerPage);

		return vacancies;
	}

	async getBySlug(slug: string): Promise<VacancyModel> {
		const vacancy = await this.vacancyModel.findOne({ slug });

		if (!vacancy) {
			throw new NotFoundException('Vacancy with this slug not found');
		}

		return vacancy;
	}

	async getHotVacancies(): Promise<VacancyModel[]> {
		const hotVacancies = await this.vacancyModel.find({ is_hot: true });

		return hotVacancies;
	}

	async setIsHot(slug: string, dto: SetIsHotDto): Promise<VacancyModel> {
		const vacancy = await this.vacancyModel.findOneAndUpdate(
			{ slug },
			{ is_hot: dto.is_hot },
		);

		return await vacancy;
	}

	async delete(slug: string): Promise<VacancyModel> {
		return await this.vacancyModel.findOneAndDelete({ slug });
	}
}
