import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MyConfig } from 'src/config/type';
import { AuthService } from '../auth.service';

@Injectable()
export class LineJwtStrategy extends PassportStrategy(Strategy, 'line-jwt') {
  constructor(
    protected configService: ConfigService<MyConfig>,
    private authService: AuthService,
  ) {
    super();
  }

  async validate(token: string) {
    // https://developers.line.biz/en/reference/line-login/#verify-id-token
    // POST /oauth2/v2.1/verify (ID token)
    // 200 OK(user ID, name, picture URL, email)
    console.log({ token });
    const result = await fetch('https://api.line.me/oauth2/v2.1/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        id_token: token,
        client_id: this.configService.get('line.channelID', { infer: true }),
      }),
    });
    const data = await result.json();
    const userId = data?.sub;
    if (!userId) {
      throw new UnauthorizedException('Invalid ID token');
    }

    return this.authService.validateOrCreateUser({
      id: userId,
      // email: lineProfile.emails?.[0].value,
      name: data?.name,
      pictureUrl: data?.picture,
    });
  }
}
