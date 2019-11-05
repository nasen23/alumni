import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
// import { UserEntity } from './user/user.entity'
// import { ActivityEntity } from './activity/activity.entity'
import { ActivityModule } from './activity/activity.module'
import { HttpErrorFilter } from './shared/http-error.filter'

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ActivityModule],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: HttpErrorFilter
  }],
  controllers: [AppController],
})
export class AppModule {}
