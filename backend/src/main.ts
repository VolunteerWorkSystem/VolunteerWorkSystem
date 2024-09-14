import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupOpenApi } from './openapi';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupOpenApi(app);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
