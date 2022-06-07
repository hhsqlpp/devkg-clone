import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { VideoModel } from './video.model';
import { CompanyModule } from 'src/company/company.module';

@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: VideoModel,
				schemaOptions: {
					collection: 'videos',
				},
			},
		]),
		CompanyModule,
	],
	controllers: [VideoController],
	providers: [VideoService],
})
export class VideoModule {}
