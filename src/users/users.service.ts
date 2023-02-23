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
    console.log(id)
    let res = this.jsonWorkerService.getMany(TABLE_NAME, { id: +id });
    const specializations = this.jsonWorkerService.getMany('specializations')
    res = this.jsonWorkerService.joinMany(res, 'achievements', 'achievementsUsers', 'userId', 'achievementsId')
    res = this.jsonWorkerService.joinMany(res, 'orders', 'ordersUsers', 'userId', 'orderId')
    res = this.jsonWorkerService.leftJoin(res, 'applications', 'id', 'userId')
    res = this.jsonWorkerService.leftJoin(res, 'ordersUsers', 'id', 'userId')[0]

    if (!res?.applications) return res
    res.applications = res?.applications?.map(application => {
      return {
        ...application,
        specialization: specializations.find(spec => application.specializationid === spec.id)
      }
    })

    return res
  }

  getOneCustomer(id: number): UserDto {
    let res = this.jsonWorkerService.getMany(TABLE_NAME, { id: +id });
    res = this.jsonWorkerService.leftJoin(res, 'orders', 'id', 'customerId')[0]

    return res
  }

  getFreelancersByOrderId(orderId: number): UserDto[] {
    let res = this.jsonWorkerService.getMany('ordersUsers', { orderId: +orderId})
    res = this.jsonWorkerService.leftJoin(res, TABLE_NAME, 'userId', 'id')[0]

    return res
  }

  getOne(id: number): UserDto {
    const res: UserDto = this.jsonWorkerService.findOne(TABLE_NAME, { id: +id });
    if (res.role === 1) return this.getOneFreelancer(id)
    return this.getOneCustomer(id)
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

  edit(dto: UserDto) {
    return this.jsonWorkerService.edit(TABLE_NAME, dto, { id: dto.id })
  }
}
