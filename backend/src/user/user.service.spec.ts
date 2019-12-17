import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '../app.module'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { ConfigModule } from '../config/config.module'

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule,
        TypeOrmModule.forFeature([UserEntity])
      ],
      providers: [
        UserService,
      ],
      controllers: [UserController],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });
});
