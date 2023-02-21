import { Get, Injectable } from '@nestjs/common';
import { JsonWorkerService } from 'src/json-worker/json-worker.service';
import { AuthUserDto } from './dto/auth.dto';
import { UserDto } from './dto/user.dto';

const TABLE_NAME = 'users'
enum Roles {
  FREELANCER = 1,
  CUSTOMER = 2,
}

@Injectable()
export class UsersService {
  constructor(
    private readonly jsonWorkerService: JsonWorkerService,
  ) {}

  getMany(): string {
    return this.jsonWorkerService.getMany(TABLE_NAME);
  }

  getFreelancers(): UserDto[] {
    let res = this.jsonWorkerService.getMany(TABLE_NAME, { role: Roles.FREELANCER });
    res = this.jsonWorkerService.joinMany(res, 'achievements', 'achievementsUsers', 'userId', 'achievementsId')
    res = this.jsonWorkerService.joinMany(res, 'orders', 'ordersUsers', 'userId', 'orderId')
    return this.jsonWorkerService.leftJoin(res, 'ordersUsers', 'id', 'userId')
  }

  getOneFreelancer(id: number): UserDto {
    let res = this.jsonWorkerService.getMany(TABLE_NAME, { id: +id });
    const specializations = this.jsonWorkerService.getMany('specializations')
    res = this.jsonWorkerService.joinMany(res, 'achievements', 'achievementsUsers', 'userId', 'achievementsId')
    res = this.jsonWorkerService.joinMany(res, 'orders', 'ordersUsers', 'userId', 'orderId')
    res = this.jsonWorkerService.leftJoin(res, 'applications', 'id', 'userId')
    res = this.jsonWorkerService.leftJoin(res, 'ordersUsers', 'id', 'userId')[0]

    res.applications = res?.applications?.map(application => {
      return {
        ...application,
        specialization: specializations.find(spec => application.specializationid === spec.id)
      }
    })

    return res
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
