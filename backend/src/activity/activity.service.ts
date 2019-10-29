import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ActivityEntity } from './activity.entity';
import { ActivityDTO } from 'src/activity/activity.dto';

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
    return await this.activityRepository.findOne(id)
  }

  async update(id: string, data: Partial<ActivityDTO>) {
    await this.activityRepository.update(id, data)
    return await this.activityRepository.findOne(id)

  }

  async destroy(id: string) {
    const activity = await this.activityRepository.findOne(id)
    if (!activity) {
      return { noid: id }
    }
    await this.activityRepository.delete(id)
    return { deleted: true }
  }
}
