import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'

import { UserEntity } from '../user/user.entity'

@Entity('activity')
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => UserEntity, user => user.heldActivities, {
    cascade: true
  })
  organizer: UserEntity

  @Column('text')
  name: string

  @Column('text')
  time: string

  @Column('text')
  site: string

  @Column('text')
  intro: string

  @Column('text')
  phone: string

  @Column('text')
  signupStart: string

  @Column('text')
  signupEnd: string
}

