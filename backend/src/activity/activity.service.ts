import { Repository, getRepository } from 'typeorm'
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ActivityDTO } from './activity.dto'
import { ActivityEntity } from './activity.entity'

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>
  ) {}

  async showAll() {
    return await this.activityRepository.find()
  }

  // Return all activities including only the specified fields
  async showAllPartially(data: Object) {
    let selection = []
    for (let key in data) {
      if (data[key]) {
        selection = selection.concat('activity.' + key)
      }
    }

    const activities = await getRepository(ActivityEntity)
      .createQueryBuilder('activity')
      .select(selection)
      .getMany()

    return activities
  }

  async create(data: ActivityDTO) {
    const activity = this.activityRepository.create(data)
    await this.activityRepository.save(activity)
    return activity
  }

  async read(id: string) {
    try {
      const activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }

      return activity
    } catch(error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: string, data: Partial<ActivityDTO>) {
    try {
      const activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }

      await this.activityRepository.update(id, data)

      return this.activityRepository.findOne(id)
    } catch(error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
  }

  async destroy(id: string) {
    try {
      const activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND)
      }

      await this.activityRepository.delete(id)

      return activity
    } catch(error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
  }
}
