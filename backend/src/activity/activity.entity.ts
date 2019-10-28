import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { UserEntity } from '../user/user.entity'

@Entity('activity')
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => UserEntity, user => user.activities)
  actHost: UserEntity

  @Column('text')
  actName: string

  @Column('time with time zone')
  actTime: Date

  @Column('text')
  actSite: string

  @Column('text')
  actIntro: string
}

