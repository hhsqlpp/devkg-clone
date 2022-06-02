import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { VacancyModel } from './vacancy.model';
import slugify from 'slugify';

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

  async getAll(): Promise<VacancyModel[]> {
    const vacancies = await this.vacancyModel.find();

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
}
