import { Get, Injectable } from '@nestjs/common';
import { JsonWorkerService } from 'src/json-worker/json-worker.service';
import { AuthUserDto } from './dto/auth.dto';
import { UserDto } from './dto/user.dto';

const TABLE_NAME = 'users'

@Injectable()
export class UsersService {
  constructor(
    private readonly jsonWorkerService: JsonWorkerService,
  ) {}

  getMany(): string {
    return this.jsonWorkerService.getMany(TABLE_NAME);
  }

  getOne(id: number): string {
    return this.jsonWorkerService.findOne(TABLE_NAME, { id });
  }

  getByAuthData(dto: AuthUserDto) {
    return this.jsonWorkerService.findOne(TABLE_NAME, dto);
  }

  getByLogin(login: string): boolean {
    return this.jsonWorkerService.findOne(TABLE_NAME, { login });
  }

  create(dto: UserDto): UserDto {
    return this.jsonWorkerService.create(TABLE_NAME, dto)
  }
}
