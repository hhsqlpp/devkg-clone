import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { EventController } from './event.controller';
import { EventModel } from './event.model';
import { EventService } from './event.service';
import { FileService } from '../file/file.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: EventModel,
				schemaOptions: {
					collection: 'events',
				},
			},
		]),
	],
	controllers: [EventController],
	providers: [EventService, FileService],
})
export class EventModule {}
