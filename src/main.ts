import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Boilerplate JWT, TypeORM, Postgres, Swagger')
    .setDescription('Boilerplate JWT, TypeORM, Postgres, Swagger')
    .setContact('Alejandro Larreta Valenzuela', '', 'larreta_vzla@hotmail.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT);
  logger.log(`App running on port: ${process.env.PORT}`)

}
bootstrap();
