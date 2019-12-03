import { Repository, getRepository, createConnection, createQueryBuilder } from 'typeorm'
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { ActivityDTO } from './activity.dto'
import { ActivityEntity } from './activity.entity'
import { UserEntity } from 'src/user/user.entity'

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>
  ) {}

  async showAll() {
    return await getRepository(ActivityEntity)
      .createQueryBuilder('act')
      .leftJoinAndSelect('act.organizer', 'user')
      .getMany()
  }

  // Return all activities including only the specified fields
  async showAllPartially(data: Object) {
    let selection = []
    for (let key in data) {
      if (data[key]) {
        selection = selection.concat('act.' + key)
      }
    }

    const activities = await getRepository(ActivityEntity)
      .createQueryBuilder('act')
      .select(selection)
      .getMany()

    return activities
  }

  async create(data: ActivityDTO) {
    const user = await getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.id = :id', { id: data.openid })
      .getOne()
    data['organizer'] = user

    const activity = await this.activityRepository.create(data)
    await this.activityRepository.save(activity)
    return activity
  }

  async read(id: string) {
    try {
      const activity = await getRepository(ActivityEntity)
        .createQueryBuilder('act')
        .leftJoinAndSelect('act.organizer', 'user')
        .where('act.id = :id', { id: id })
        .getOne()
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

  async destroyAll() {
    this.activityRepository.clear()
    return { delete: 'success' }
  }
}
