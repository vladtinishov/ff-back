import { AchievementsDto } from "src/achievements/dto/achievements.dto"
import { ApplicationDto } from "src/applications/dto/applications.dto"
import { OrderDto, OrderUserDto } from "src/orders/dto/order.dto"

export interface UserDto {
  id?: number
  companyName: string
  name: string
  surname: string
  login: string
  password: string
  lang: string
  about: string
  isNewMode: boolean
  role: number
  likes: number
  achievements?: AchievementsDto[]
  orders?: OrderDto[]
  ordersUsers?: OrderUserDto[]
  applications?: ApplicationDto[]
}