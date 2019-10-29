import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common'

import { ActivityService } from './activity.service'
import { ActivityDTO } from './activity.dto'

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

  @Get(':id')
  readActivity(@Param('id') id: string) {
    return this.activityService.read(id)
  }

  @Put(':id')
  updateActivity(@Param('id') id: string, @Body() data: Partial<ActivityDTO>) {
    return this.activityService.update(id, data)
  }

  @Delete(':id')
  destroyActivity(@Param('id') id: string) {
    return this.activityService.destroy(id)
  }
}
