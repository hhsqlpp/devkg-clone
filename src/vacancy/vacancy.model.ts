import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Salary, WorkEnum } from './vacancy.interface';

export interface VacancyModel extends Base {}
export class VacancyModel extends TimeStamps {
	@ApiProperty({ type: String })
	@prop()
	position: string;

	@ApiProperty({ enum: WorkEnum })
	@prop({ type: String })
	type: string = 'Офис/Бишкек';

	@ApiProperty({ type: {} })
	@prop()
	salary: Salary;

	@ApiProperty({ type: String })
	@prop()
	description: string;

	@ApiProperty({ type: String })
	@prop()
	telegram?: string;

	@ApiProperty({ type: String })
	@prop()
	email?: string;

	@ApiProperty({ type: String })
	@prop()
	company_name: string;

	@ApiProperty({ type: String })
	@prop()
	company_slug: string;

	@ApiProperty({ type: String })
	@prop()
	slug: string;

	@ApiProperty({ type: Boolean })
	@prop()
	is_hot: boolean = false;
}
