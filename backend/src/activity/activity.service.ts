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
    return this.activityRepository.find()
  }

  async create(data: ActivityDTO) {
    const activity = this.activityRepository.create(data)
    await this.activityRepository.save(activity)
    return activity
  }

  async read(name: string) {
    return this.activityRepository.findOne({ where: { "name": name }})
  }

  async update(name: string, data: Partial<ActivityDTO>) {
    await this.activityRepository.update(name, data)
  }

  async destroy(name: string) {
    await this.activityRepository.delete(name)
    return { deleted: true }
  }
}
