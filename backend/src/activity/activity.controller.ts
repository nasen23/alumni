import { Controller, Get, Post, Put, Delete, Body, Query, UsePipes, Logger } from '@nestjs/common'

import { ActivityService } from './activity.service'
import { ActivityDTO } from './activity.dto'
import { ValidationPipe } from '../shared/validation.pipe'

@Controller('activity')
export class ActivityController {
  private logger = new Logger('ActivityLogger')

  constructor(private activityService: ActivityService) {}

  @Get('all')
  showAllActivities() {
    return this.activityService.showAll()
  }

  @Post('all')
  showAllPartially(@Body() data: Object) {
    return this.activityService.showAllPartially(data)
  }

  @Post('add')
  @UsePipes(new ValidationPipe())
  createActivity(@Body() data: ActivityDTO) {
    this.logger.log(JSON.stringify(data))
    return this.activityService.create(data)
  }

  @Get('get')
  readActivity(@Query('id') id: string) {
    return this.activityService.read(id)
  }

  @Put('put')
  @UsePipes(new ValidationPipe())
  updateActivity(@Query('id') id: string, @Body() data: Partial<ActivityDTO>) {
    this.logger.log(JSON.stringify(data))
    return this.activityService.update(id, data)
  }

  @Delete('delete')
  destroyActivity(@Query('id') id: string) {
    return this.activityService.destroy(id)
  }

  @Delete('delete/all')
  destroyAll() {
    return this.activityService.destroyAll()
  }
}
