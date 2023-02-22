import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { getCookie } from 'src/utils/cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return <string>getCookie('ff-access-token', request.headers.cookie);
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.accessTokenSecret,
    });
  }

  async validate(payload: any) {
    console.log(payload)
    const user = await this.usersService.getByLogin(payload.login);
    if (!user) throw new HttpException('Token is correct but user is not defined', HttpStatus.FORBIDDEN);

    return user;
  }
}
