import { UserEntity } from 'src/user/user.entity';

export class ActivityDTO {
  readonly id: string
  actHost: UserEntity
  actName: string
  actTime: Date
  actSite: string
  actIntro: string
}
