import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany } from 'typeorm'
import { ActivityEntity } from '../activity/activity.entity'

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string
 
  @Column('text')
  username: string

  // alumni identity authentication
  @Column()
  authed: boolean

  // phone number
  @Column()
  phone: string

  // enrollment year
  @Column()
  grade: string

  // department
  @Column()
  department: string

  // @OneToMany(() => ActivityEntity, activity => activity.organizer)
  // heldActivities: ActivityEntity[]

  // @ManyToMany(() => ActivityEntity, activity => activity.organizer)
  // attendedActivities: ActivityEntity[]
}
