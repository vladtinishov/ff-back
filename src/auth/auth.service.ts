import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,

  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.getByAuthData(login);
    if (!user) return;

    return user;
  }

  getJwtAccessToken(login: string) {
    const payload = { login };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.accessTokenSecret,
      expiresIn: jwtConstants.accessTokenExpirationTime,
    });
    return token;
  }

  getJwtRefreshToken(userId: number, login: string) {
    const payload = { id: userId, login };
    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshTokenSecret,
      expiresIn: jwtConstants.refreshTokenExpirationTime,
    });
    return token;
  }

  async sendEmail(data: SendEmailDto) {
    const { email } = data;

    return this.mailService.sendTemplate({
      to: 'email',
      template: 'recovery',
      lang: 'ru',
      params: {
        hash: this.getJwtAccessToken(email),
        login: 'email',
      }
    });
  }

  async updatePassword(data: UpdatePasswordDto, hash: string) {
    const payload = await this.checkToken(hash);
    const user = await this.getUserLogin(payload.login);
  }

  async getUserByHash(hash: string) {
    const payload = await this.checkToken(hash);
    const user = await this.getUserLogin(payload.login);

    return user;
  }

  async getUserLogin(email: string) {
    const user = await this.usersService.getByLogin(email);

    if (!user) return;

    return user;
  }

  async checkToken(hash: string) {
    const payload = this.jwtService.decode(hash) as JwtPayload;

    if (!payload?.login) {
      throw new BadRequestException('Not found login in payload');
    }

    return payload;
  }
}
