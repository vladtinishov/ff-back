import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { JsonWorkerService } from 'src/json-worker/json-worker.service';
import { MailService } from 'src/mail/mail.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

const TABLE_NAME = 'users'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
    private readonly jsonWorkerService: JsonWorkerService,

  ) {}

  async signupUser(dto: UserDto) {
    const userData: UserDto = {
      name: dto?.name || '',
      surname: dto?.surname || '',
      lang: dto.lang,
      login: dto.login,
      password: dto.password,
      companyName: dto?.companyName || '',
      role: dto.role,
      about: dto.about,
      likes: 0
    }

    const user = this.usersService.create(userData)

    const accessToken = this.getJwtAccessToken(user.login);

    return {
      accessToken,
    }
  }

  async loginUser(dto: UserDto) {
    const accessToken = this.getJwtAccessToken(dto.login);

    return {
      accessToken,
    }
  }

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.getByAuthData({ login, password });
    if (!user) return;

    return user;
  }

  edit(dto: UserDto) {
    return this.jsonWorkerService.edit(TABLE_NAME, dto, { id: dto.id })
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
