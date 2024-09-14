import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-line';
import { MyConfig } from 'src/config/type';
import { AuthService } from '../auth.service';

@Injectable()
export class LineStrategy extends PassportStrategy(Strategy, 'line') {
  constructor(
    protected configService: ConfigService<MyConfig>,
    private authService: AuthService,
  ) {
    super({
      channelID: configService.get('line.channelID', { infer: true }),
      channelSecret: configService.get('line.channelSecret', { infer: true }),
      // callbackURL: 'http://localhost:3000/auth/google/callback',
      // scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    // done: VerifyCallback,
  ): Promise<any> {
    // return this.authService.validateOrCreateLineUser(profile);
  }
}
