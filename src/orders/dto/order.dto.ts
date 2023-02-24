import { UserDto } from "src/users/dto/user.dto"

export class OrderDto {
  id?: number
  customerId: number
  users: UserDto[]
  ordersUsers: OrderUserDto[]
  specializationId: number
  task: string
  isTaked: boolean
  content: string
  createdAt: string
  requiredQualityId: number
  isClosed: boolean
}

export interface OrderUserDto {
  id?: number
  orderId: number
  userId: number
  isApproved: boolean
  isApprovedByFreelancer: boolean
  isClosed: boolean
  likes: number
}