import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: '*', // substitua pelo seu domínio permitido
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // cabeçalhos permitidos
  });
  

  await app.listen(3001);
}
bootstrap();
