import { DocumentBuilder } from '@nestjs/swagger';

export const DocumentConfig = new DocumentBuilder()
    .setTitle("Api Authentication")
    .setDescription("All Microservice need to auth here")
    .setVersion('1.0')
    .addBearerAuth()
    .build();