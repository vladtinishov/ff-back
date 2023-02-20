import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from '../constants';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.gnzs_refresh_token;
        },
      ]),
      secretOrKey: jwtConstants.refreshTokenSecret,
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload) {
    // return this.userService.getUserIfRefreshTokenMatches(
    //   request.cookies.gnzs_refresh_token,
    //   payload.id,
    // );
  }
}
