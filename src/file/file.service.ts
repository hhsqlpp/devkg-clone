import { HttpException, Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
	async saveFiles(
		images: Express.Multer.File[],
		folder: string = 'default',
	): Promise<FileResponse[]> {
		if (!images && images.length == 0)
			throw new HttpException('Отсутствуют файлы', 404);

		const uploadFolder = `${path}/uploads/${folder}`;
		await ensureDir(uploadFolder);

		const res: FileResponse[] = await Promise.all(
			images.map(async (image) => {
				await writeFile(
					`${uploadFolder}/${image.originalname}`,
					image.buffer,
				);

				return {
					url: `/uploads/${folder}/${image.originalname}`,
					name: image.originalname,
				};
			}),
		);

		return res;
	}
}
