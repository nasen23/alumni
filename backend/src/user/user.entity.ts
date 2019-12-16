import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity('user')
export class UserEntity {
  @PrimaryColumn()
  id: string

  @Column({
    type: 'text',
    default: ''
  })
  username: string

  @Column({
    type: 'text',
    default: ''
  })
  realname: string

  @Column({
    type: 'text',
    default: ''
  })
  avatarUrl: string

  @Column({
    type: 'text',
    default: ''
  })
  wechatId: string

  @Column({
    type: 'text',
    default: ''
  })
  idNumber: string

  @Column({
    type: 'text',
    default: ''
  })
  email: string

  @Column({
    type: 'text',
    default: ''
  })
  address: string

  // alumni identity authentication
  @Column()
  authed: boolean

  @Column({
    type: 'text',
    default: ''
  })
  phone: string

  // enrollment year
  @Column({
    type: 'text',
    default: ''
  })
  grade: string

  @Column({
    type: 'text',
    default: ''
  })
  department: string

  @Column({
    type: 'simple-array',
    default: '',
    nullable: true
  })
  heldActivities: string[]

  @Column({
    type: 'simple-array',
    default: '',
    nullable: true
  })
  attendedActivities: string[]
}
