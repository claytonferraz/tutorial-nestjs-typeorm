import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
  );
  app.useGlobalPipes(
      new ValidationPipe({
          // whitelist garante que tudo que não estiver no DTO, será jogado fora
        whitelist: true,
          //aquele que não está na lista, será proibido
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );

  const config = new DocumentBuilder()
      .setTitle('Api Service Diário')
      .setDescription('The education API description')
      .setVersion('1.0')
      .addTag('education')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
