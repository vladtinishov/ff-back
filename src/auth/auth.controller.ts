import { Controller, Post, UseGuards, Request, Res, Body, Get, Param, Patch } from '@nestjs/common';
import { CookieOptions, Response } from 'express';
import { UserDto } from 'src/users/dto/user.dto';
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
  constructor(
    private readonly authService: AuthService, 
    private readonly usersService: UsersService, 
  ) {}

  @Post('signup')
  async signup(@Body() dto: UserDto) {
    return this.authService.signupUser(dto)
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req, @Res({ passthrough: true }) resp: Response) {
    const { user } = req;
    return this.authService.loginUser(user)
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
    const user: UserDto = this.usersService.getOne(req.user.id);
    return user;
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  refresh(@Request() req, @Res({ passthrough: true }) resp) {
  }

  @Post('get-token')
  async getAccessToken(@Body('login') login) {
    return await this.authService.getJwtAccessToken(login);
  }

  @Post('check-token')
  async checkToken(@Body() data: CheckTokenDto) {
    return await this.authService.getUserByHash(data.hash);
  }

  
  @Patch()
  edit(@Body() dto: UserDto): UserDto {
    return this.authService.edit(dto);
  }
}
