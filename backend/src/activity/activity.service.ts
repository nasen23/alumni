import { Repository } from 'typeorm'
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
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

      console.log(activity)
      console.log(typeof(activity))
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
