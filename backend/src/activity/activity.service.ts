import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, In, Like, Equal } from 'typeorm'
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'

import { ActivityDTO } from './activity.dto'
import { ActivityEntity } from './activity.entity'
import { UserEntity } from '../user/user.entity'

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>
  ) {}

  async showAll() {
    return await this.activityRepository.find()
  }

  async getUserActivities(data: any) {
    const held = await this.activityRepository.find({
      where: {
        organizer: Equal(data.openid)
      }
    })

    const attended = await this.activityRepository.find({
      where: {
        participants: Like(`%${data.openid}%`)
      }
    })

    return {
      held,
      attended
    }
  }

  // Return all activities including only the specified fields
  async showAllPartially(data: Object) {
    let selection = []
    for (let key in data) {
      selection = selection.concat('act.' + key)
    }

    const activities = await getRepository(ActivityEntity)
      .createQueryBuilder('act')
      .select(selection)
      .getMany()

    return activities
  }

  async create(data: Partial<ActivityDTO>) {
    Logger.log(data)
    let activity = await this.activityRepository.create(data)
    activity.organizer = data.openid
    activity.site = data['site']
    activity.fields = data['fields']
    await this.activityRepository.save(activity)

    let user = await getRepository(UserEntity).findOne(data.openid)
    user.heldActivities.push(activity.id)
    await getRepository(UserEntity).save(user)

    return activity
  }

  async read(id: string) {
    try {
      const activity = this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      return activity
    } catch(error) {
      throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, data: Partial<ActivityDTO>) {
    try {
      const activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      await this.activityRepository.update(id, data)

      return this.activityRepository.findOne(id)
    } catch(error) {
      throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
    }
  }

  async destroy(id: string) {
    try {
      const activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      await this.activityRepository.delete(id)

      return activity
    } catch(error) {
      throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
    }
  }

  async destroyAll() {
    await this.activityRepository.clear()
    return { delete: 'success' }
  }

  async uploadPicture(file: any, data: any) {
    const activity = await this.activityRepository.findOne(data.pictureId)
    activity.pictures.push(file.filename)
    await this.activityRepository.save(activity)

    return { picture: file.filename}
  }

  async signup(data: any) {
    const activity = await this.activityRepository.findOne(data.id)
    activity.participants = data.participants
    await this.activityRepository.save(activity)

    return activity
  }
}
