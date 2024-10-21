import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
