import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from './di/AppModule';

function applySwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle("Twitter sample")
    .setDescription("The Twitter sample API description")
    .setVersion("0.1")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  applySwagger(app);
  await app.listen(3000);
}
bootstrap();
