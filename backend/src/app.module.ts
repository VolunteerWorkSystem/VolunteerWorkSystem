import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles.guard';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import { MyConfig } from './config/type';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { LineJwtAuthGuard } from './auth/line-jwt/line-jwt-auth.guard';
import { CheckInsModule } from './check-ins/check-ins.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      // validate: validate,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<MyConfig>) => {
        console.log(configService.get('db', { infer: true }));
        return {
          ...configService.get('db', { infer: true }),
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    AuthModule,
    CheckInsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
