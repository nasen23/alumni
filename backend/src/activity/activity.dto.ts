import { IsString } from 'class-validator'

// import { UserEntity } from '../user/user.entity'

export class ActivityDTO {
  @IsString()
  readonly id: string

  // actHost: UserEntity

  @IsString()
  actName: string

  // actTime: Date

  @IsString()
  actSite: string

  @IsString()
  actIntro: string
}
