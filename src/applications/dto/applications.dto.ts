export interface ApplicationDto {
  id: number
  userId: number
  isFavorite: boolean,
  isActive: boolean,
  name: string,
  surname: string,
  phone: string,
  email: string,
  langs: string[],
  specializationid: number
  expiriences: {
    authorName: string,
    task: string
  }[],
  hasExpirience: boolean
  specialization?: {
    name: string
    id: number
  }
  skills: string[],
  education: {
    name: string,
    grade: string,
    specialization: string
  }
}