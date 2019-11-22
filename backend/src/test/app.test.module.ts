import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppService } from './../app.service'
import { AppController } from './../app.controller'
import { UserModule } from './user.test.module'
// import { UserEntity } from './../user/user.entity'
// import { ActivityEntity } from './activity/activity.entity'
import { ActivityModule } from './activity.test.module'
import { HttpErrorFilter } from './../shared/http-error.filter'
import { ConfigModule } from './../config/config.module'

@Module({
  imports: [UserModule, ActivityModule, ConfigModule],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  },],
  controllers: [AppController],
})
export class AppModule {}
