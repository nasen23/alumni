import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DefaultAdminSite, DefaultAdminModule } from 'nestjs-admin'

import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity]),
    DefaultAdminModule
  ],
  providers: [
    UserService,
  ],
  controllers: [UserController],
  exports: []
})
export class UserModule {
  constructor (private readonly adminSite: DefaultAdminSite) {
      adminSite.register('User', UserEntity)
  }
}
