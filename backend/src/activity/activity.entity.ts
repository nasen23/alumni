import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('activity')
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', {
    default: ''
  })
  name: string

  @Column('text', {
    default: '',
    nullable: true
  })
  actStart: string

  @Column('text', {
    default: '',
    nullable: true
  })
  actEnd: string

  @Column('simple-json', {
    default: null,
    nullable: true
  })
  site: {
    name: string,
    address: string,
    detail: string,
    latitude: number,
    longitude: number
  }

  @Column('simple-json', {
    default: null
  })
  fields:{}

  @Column('text', {
    default: '',
    nullable: true
  })
  intro: string

  @Column('text', {
    default: ''
  })
  maxParticipants: string

  @Column('text', {
    default: '',
    nullable: true
  })
  phone: string

  @Column('text', {
    default: ''
  })
  signupStart: string

  @Column('text', {
    default: ''
  })
  signupEnd: string

  @Column({
    type: 'simple-array',
    default: '',
    nullable: true
  })
  pictures: string[]

  @Column({
    type: 'simple-json',
    default: '',
    nullable: true
  })
  participants: {}

  @Column('text', {
    default: ''
  })
  organizer: string
}

