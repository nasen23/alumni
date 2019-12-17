import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [
    UserService,
  ],
  controllers: [UserController],
  exports: []
})
export class UserModule {}
