import { join } from 'path'
import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ServeStaticModule } from '@nestjs/serve-static'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { ActivityModule } from './activity/activity.module'
import { HttpErrorFilter } from './shared/http-error.filter'
import { ConfigModule } from './config/config.module'

@Module({

  imports: [
    UserModule,
    ConfigModule,
    ActivityModule,
    TypeOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'imgs'),
    }),
  ],
  providers: [
    AppService, {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    }
  ],
  controllers: [AppController],
})
export class AppModule {}
