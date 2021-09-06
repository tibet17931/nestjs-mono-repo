import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from 'libs/jwt';
import { AppModule } from './app/app.module';

async function bootstrap() {

  const logger = new Logger("Main");

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get("auth.port") || 3000;

  const prefix = 'authentication';
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(prefix);

  const swagger_config = new DocumentBuilder()
    .setTitle(config.get("auth.swagger.title"))
    .setDescription(config.get("auth.swagger.description"))
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger_config);
  SwaggerModule.setup(`${prefix}/api-docs`, app, document);

  // Enable JWT
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  // Enable Cors
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  });

  await app.listen(port, async () => logger.log(await app.getUrl()));
}

bootstrap();
