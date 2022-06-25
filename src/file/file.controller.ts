import {
	Controller,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('file')
export class FileController {
	constructor(private fileService: FileService) {}

	@Post('save')
	@UseInterceptors(FilesInterceptor('image'))
	async uploadFile(
		@UploadedFiles() images: Express.Multer.File[],
		@Query('folder') folder?: string,
	) {
		return this.fileService.saveFiles(images, folder);
	}
}
