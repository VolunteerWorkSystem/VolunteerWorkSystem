import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserPayload } from './auth/dto/user-payload.dto';

export function setupOpenApi(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('志工打卡系統')
    .setDescription('志工打卡系統')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [UserPayload],
  });
  SwaggerModule.setup('api', app, document);
}
