import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'

import { ActivityService } from './activity.service'
import { ActivityDTO } from 'src/activity/activity.dto'

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  showAllActivities() {
    return this.activityService.showAll()
  }

  @Post()
  createActivity(@Body() data: ActivityDTO) {
    return this.activityService.create(data)
  }

  @Get(':name')
  readActivity(@Param() name: string) {
    return this.activityService.read(name)
  }

  @Put()
  updateActivity(@Param() name: string, @Body() data: Partial<ActivityDTO>) {
    return this.activityService.update(name, data)
  }

  @Delete()
  destroyActivity(@Param() name: string) {
    return this.activityService.destroy(name)
  }
}
