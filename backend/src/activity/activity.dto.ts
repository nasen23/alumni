import { IsString, IsNumber } from 'class-validator'

// import { UserEntity } from '../user/user.entity'

export class ActivityDTO {
  readonly id: string

  // actHost: UserEntity

  @IsString()
  name: string

  @IsString()
  time: string

  @IsString()
  site: string

  @IsString()
  intro: string

  @IsString()
  signupStart: string

  @IsString()
  signupEnd: string
}

