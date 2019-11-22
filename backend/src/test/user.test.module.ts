import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './../user/user.entity'
import { UserService } from './../user/user.service'
import { UserController } from './../user/user.controller'
import { ConfigModule } from '../config/config.module'
import { getRepositoryToken } from '@nestjs/typeorm';

  const mockUserRepository = {
       data: [{id:'f12605cd-1008-c89e-29d7-e368344f7e99',username:'mirio',password:'123'},
              {id:'7dd1c8c7-87e5-06f8-efad-2896903f2e65',username:'masaki',password:'456'},],
  };

@Module({
  imports: [ConfigModule],
  providers: [UserService, {
           provide: getRepositoryToken(UserEntity),
           useValue: mockUserRepository,
         },],
  controllers: [UserController],
  exports: []
})
export class UserModule {}
