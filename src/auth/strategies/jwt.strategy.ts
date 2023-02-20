import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          console.log(request.cookies.gnzs_access_token)
          return request.cookies.gnzs_access_token
            ? request.cookies.gnzs_access_token
            : request.headers['x-gnzs-amo-access-token'];
        },
      ]),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.accessTokenSecret,
    });
  }

  async validate(payload: any) {
    // const user = await this.usersService.getByLogin(payload.login);
    // if (!user) throw new HttpException('Token is correct but user is not defined', HttpStatus.FORBIDDEN);

    // return { id: user.id, name: user.name, login: user.email, rights: user.access };
  }
}
