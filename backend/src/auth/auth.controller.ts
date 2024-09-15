import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LoginResponse } from './dto/login.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LineJwtAuthGuard } from './line-jwt/line-jwt-auth.guard';
import { Public } from './public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login/line')
  @Public()
  @UseGuards(LineJwtAuthGuard)
  loginLineByToken(@Req() req) {
    return this.authService.login(req.user);
  }

  // @Query(() => User)
  @Get('me')
  @UseGuards(JwtAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
