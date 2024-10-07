import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { fastifyHelmet } from '@fastify/helmet';

async function bootstrap() {
  const fastifyAdapter = new FastifyAdapter({
    logger: true,
    ignoreTrailingSlash: true,
    bodyLimit: 1048576,
    trustProxy: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  await app.register(fastifyHelmet);
  app.setGlobalPrefix('api/');
  app.enableCors({
    origin: ['http://example.com', 'http://anotherdomain.com'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('N-rich API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000, '127.0.0.1');
}
bootstrap();
