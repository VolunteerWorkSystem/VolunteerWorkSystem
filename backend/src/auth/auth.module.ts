import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyConfig } from 'src/config/type';
import { LineStrategy } from './line/line-auth.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LineJwtStrategy } from './line-jwt/line-jwt.strategy';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<MyConfig>) => ({
        ...configService.get('db', { infer: true }),
        autoLoadEntities: true,
      }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<MyConfig>) => ({
        secret: configService.get('auth.jwtSecret', { infer: true }),
        // signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthController, AuthService, LineJwtStrategy, JwtStrategy],
})
export class AuthModule {}
