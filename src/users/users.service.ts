import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getMany(): string {
    return 'many';
  }

  getOne(id: number): string {
    return 'one';
  }

  getByAuthData(login: string) {
    return login
  }

  getByLogin(login: string): boolean {
    return true
  }
}
