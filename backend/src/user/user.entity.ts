import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { ActivityEntity } from '../activity/activity.entity'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text')
  username: string

  @Column('text')
  password: string

  @OneToMany(() => ActivityEntity, activity => activity.actHost)
  activities: ActivityEntity[]
}
