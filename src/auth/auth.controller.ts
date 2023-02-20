import { Controller, Post, UseGuards, Request, Res, Body, Get, Param } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { CheckTokenDto } from './dto/check-token.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtAuthGuard } from './gurads/jwt-auth.guard';
import { JwtRefreshGuard } from './gurads/jwt-refresh.guard';
import { LocalAuthGuard } from './gurads/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private usersService: UsersService) {
  }

  private getDomain() {
    return process.env.MODE == 'prod' ? '.gnzs.ru' : 'localhost';
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Res({ passthrough: true }) resp: Response) {
    const { user } = req;
    const accessToken = this.authService.getJwtAccessToken(user.email);

    const refreshToken = this.authService.getJwtRefreshToken(user.id, user.email);
    // await this.usersService.setRefreshToken(refreshToken, user.id);

    const cookieConfig: CookieOptions = {
      domain: this.getDomain(),
    };

    resp.cookie('gnzs_access_token', accessToken, {
      ...cookieConfig,
      maxAge: 1000 * 60 * 60 * 15,
    });
    resp.cookie('gnzs_refresh_token', refreshToken, {
      ...cookieConfig,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
  }

  @Post('password-recovery')
  sendEmail(@Body() body: SendEmailDto) {
    return this.authService.sendEmail(body);
  }

  @Post('password-recovery/:hash')
  updatePassword(@Param('hash') hash: string, @Body() body: UpdatePasswordDto) {
    return this.authService.updatePassword(body, hash);
  }

  @Get('/authorized')
  @UseGuards(JwtAuthGuard)
  async getAuthorizedUser(@Request() req) {
    // const user: User = await this.usersService.getUserById(req.user.id);
    // return user;
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Request() req, @Res({ passthrough: true }) resp) {
    const { user } = req;
    const accessToken = this.authService.getJwtAccessToken(user.login);
    resp.cookie('gnzs_access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 15,
      domain: this.getDomain(),
    });
  }

  @Post('get-token')
  async getAccessToken(@Body('login') login) {
    return await this.authService.getJwtAccessToken(login);
  }

  @Post('check-token')
  async checkToken(@Body() data: CheckTokenDto) {
    return await this.authService.getUserByHash(data.hash);
  }
}
