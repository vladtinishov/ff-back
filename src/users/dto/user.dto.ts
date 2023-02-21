import { AchievementsDto } from "src/achievements/dto/achievements.dto"

export interface UserDto {
  id?: number
  name: string
  surname: string
  login: string
  password: string
  lang: string
  about: string
  role: number
  achievements?: AchievementsDto[],
  likes: number
}