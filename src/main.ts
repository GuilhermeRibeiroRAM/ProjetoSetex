import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import setupSwagger from '@/business/config/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './business/exceptions/global-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.ROOT_PATH);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  app.use(cookieParser());

  setupSwagger(app);

  await app.listen(process.env.PORT);
}
bootstrap();
