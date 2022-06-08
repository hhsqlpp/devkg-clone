import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose';

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
	@prop()
	login: string;

	@prop()
	password: string;
}
