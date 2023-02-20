export class ApplicationDto {
  id?: number
  name: string
  aboutMe: AboutMeSectionDto
  specialization: SpecializationSectionDto
  education: EducationSection
}

class AboutMeSectionDto {
  name: string
  surname: string
  phone: string
  email: string
  langs: string[]
  city: string
  skills: string[]
}

class SpecializationSectionDto {
  specializationId: number
  hasExperience: boolean
  previusTasks: string[]
}

class EducationSection {
  name: string
  grade: string
  specialization: string
}