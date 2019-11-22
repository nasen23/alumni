import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, Logger } from '@nestjs/common'

import { ActivityService } from './activity.service'
import { ActivityDTO } from './activity.dto'
import { ValidationPipe } from '../shared/validation.pipe'

@Controller('activity')
export class ActivityController {
  private logger = new Logger('ActivityLogger')

  constructor(private activityService: ActivityService) {}

  @Get()
  showAllActivities() {
    return this.activityService.showAll()
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createActivity(@Body() data: ActivityDTO) {
    this.logger.log(JSON.stringify(data))
    return  this.activityService.create(data)
  }

  @Get(':id')
  readActivity(@Param('id') id: string) {
    return this.activityService.read(id)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateActivity(@Param('id') id: string, @Body() data: Partial<ActivityDTO>) {
    this.logger.log(JSON.stringify(data))
    return this.activityService.update(id, data)
  }

  @Delete(':id')
  destroyActivity(@Param('id') id: string) {
    return this.activityService.destroy(id)
  }
}
