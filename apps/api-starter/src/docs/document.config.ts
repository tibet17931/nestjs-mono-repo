import { DocumentBuilder } from '@nestjs/swagger';

export const DocumentConfig = new DocumentBuilder()
    .setTitle("Api Starter")
    .setDescription("Api Starter")
    .setVersion('1.0')
    .addBearerAuth()
    .build();