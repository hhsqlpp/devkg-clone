import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.setGlobalPrefix('api');

	const options = new DocumentBuilder()
		.setTitle('Devkg-clone Документация')
		.setDescription('Devkg-clone API')
		.setVersion('1.0.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'Token',
			},
			'access-token',
		)
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	
	const PORT = process.env.PORT || 3000;
	await app.listen(PORT);
}
bootstrap();
