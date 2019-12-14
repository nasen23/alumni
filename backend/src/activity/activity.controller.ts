import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  UsePipes,
  Logger,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { diskStorage } from 'multer'
import { FileInterceptor } from '@nestjs/platform-express'

import { ActivityService } from './activity.service'
import { ActivityDTO } from './activity.dto'
import { ValidationPipe } from '../shared/validation.pipe'

@Controller('activity')
export class ActivityController {
  private logger = new Logger('ActivityControllerLogger')

  constructor(private activityService: ActivityService) {}

  @Get('user')
  getUserActivities(@Query() data) {
    return this.activityService.getUserActivities(data)
  }

  @Get('all')
  showAllActivities() {
    return this.activityService.showAll()
  }

  @Post('all')
  showAllPartially(@Body() data: object) {
    return this.activityService.showAllPartially(data)
  }

  @Get('get')
  readActivity(@Query('id') id: string) {
    return this.activityService.read(id)
  }

  @Post('add')
  createActivity(@Body() data: Partial<ActivityDTO>) {
    return this.activityService.create(data)
  }

  @Post('upload-picture')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'imgs/',
      filename: (req: any, file: any, cb) => {
        cb(null, req.body.pictureId + '_' + req.body.index + '.' + file.originalname.split('.').pop())
      }
    })
  }))
  uploadPicture(@UploadedFile() file, @Body() data) {
    return this.activityService.uploadPicture(file, data)
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

  @Post('signup')
  signupActivity(@Body() data: object) {
    return this.activityService.signup(data)
  }

  @Put('signup')
  changeSignupInfo(@Query('id') id: string,
                   @Query('openid') openid: string,
                   @Body() data: object) {
    return this.activityService.changeSignupInfo(id, openid, data)
  }

  @Delete('signup')
  cancelSignup(@Query('id') id: string, @Query('openid') openid: string) {
    return this.activityService.cancelSignup(id, openid)
  }
}
