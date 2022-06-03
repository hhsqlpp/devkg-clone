import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { EventController } from './event.controller';
import { EventModel } from './event.model';
import { EventService } from './event.service';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: EventModel,
				schemaOptions: {
					collection: 'Event',
				},
			},
		]),
	],
	controllers: [EventController],
	providers: [EventService],
})
export class EventModule {}
