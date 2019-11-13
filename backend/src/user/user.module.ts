import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ConfigModule } from '../config/config.module'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ConfigModule],
  providers: [UserService],
  controllers: [UserController],
  exports: []
})
export class UserModule {}
