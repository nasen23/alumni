import { Repository } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '../app.module'
import { UserEntity } from '../user/user.entity'
import { ActivityModule } from './activity.module'
import { ActivityEntity } from './activity.entity'
import { ActivityService } from './activity.service'
import { ActivityController } from './activity.controller'

describe('Activity Controller', () => {
  let controller: ActivityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forFeature([ActivityEntity]),
      ],
      providers: [
        ActivityService,
      ],
      controllers: [
        ActivityController,
      ],
    }).compile();
    controller = module.get<ActivityController>(ActivityController)
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
