import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DefaultAdminSite, DefaultAdminModule } from 'nestjs-admin'

import { ActivityEntity } from './activity.entity'
import { ActivityService } from './activity.service'
import { ActivityController } from './activity.controller'
import { Repository } from 'typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityEntity]),
    DefaultAdminModule
  ],
  providers: [
    ActivityService,
  ],
  controllers: [
    ActivityController,
  ],
  exports: []
})
export class ActivityModule {
  constructor (private readonly adminSite: DefaultAdminSite) {
      adminSite.register('Activity', ActivityEntity)
  }
}
