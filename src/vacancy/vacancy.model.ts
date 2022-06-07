import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Salary, WorkType } from './vacancy.interface';

export interface VacancyModel extends Base {}
export class VacancyModel extends TimeStamps {
	@prop()
	position: string;

	@prop({ type: String })
	type: WorkType = 'Офис/Бишкек';

	@prop()
	salary: Salary;

	@prop()
	description: string;

	@prop()
	telegram?: string;

	@prop()
	email?: string;

	@prop()
	company_name: string;

	@prop()
	company_slug: string;

	@prop()
	slug: string;

	@prop()
	is_hot: boolean = false;
}
