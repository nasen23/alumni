import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ActivityEntity } from './activity.entity'
import { ActivityService } from './activity.service'
import { ActivityController } from './activity.controller'

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity])],
  providers: [
    ActivityService,
  ],
  controllers: [ActivityController],
  exports: []
})
export class ActivityModule {}
