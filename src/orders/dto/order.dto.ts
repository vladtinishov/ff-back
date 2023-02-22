import { UserDto } from "src/users/dto/user.dto"

export class OrderDto {
  id?: number
  customerId: number
  users: UserDto[]
  task: string
  content: string
  createdAt: string
  requiredQualityId: number
}

export interface OrderUserDto {
  id: number
  orderId: number
  userId: number
  isClosed: number
  likes: number
}