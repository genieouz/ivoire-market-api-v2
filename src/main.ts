import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './commons/config/env';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Ivoire Discount API')
    .setDescription('The ivoire discount API description')
    .setVersion('2.0')
    .addTag('IvoireDiscount')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
