import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from 'src/users/users.service';

// import { App } from 'firebase-admin/app';
// import { DecodedIdToken, getAuth } from 'firebase-admin/auth';
import { Role } from 'src/users/role.enum';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './dto/user-payload.dto';
import { UpdateUserInput } from 'src/users/dto/update-user.input';

interface CustomClaims {
  role: Role;
}
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,

    // @Inject('FIREBASE_APP')
    // private firebaseApp: App,
  ) {
    // super({
    //   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    // });
  }

  checkPermission(user: User) {
    if (user.role === Role.Unverified) {
      throw new UnauthorizedException('使用者未註冊，請聯絡管理員');
    }
  }

  async validateOrCreateUser(userInput: UpdateUserInput) {
    let user = await this.usersService.findOneBy({
      id: userInput.id,
    });
    if (user) {
      user = await this.usersService.update(userInput.id, {
        ...userInput,
      });
    }
    if (!user) {
      user = await this.usersService.create({
        ...userInput,
        role: Role.Unverified,
      });
    }
    this.checkPermission(user);
    return user;
  }

  async validateUser(id: string) {
    const user = await this.usersService.findOneBy({
      id,
    });
    this.checkPermission(user);
    return user;
  }

  async login(user: User) {
    const payload: UserPayload = {
      id: user.id,
      name: user.name,
      pictureUrl: user.pictureUrl,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // register() {
  //   if (!user) {
  //     user = await this.usersService.create({
  //       id: decodedToken.uid,
  //       email: decodedToken.email,
  //     });
  //   }
  // }
}
