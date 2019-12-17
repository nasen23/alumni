import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '../app.module'
import { ActivityEntity } from './activity.entity'
import { ActivityService } from './activity.service'
import { ActivityController } from './activity.controller'
import { ActivityModule } from './activity.module';

describe('ActivityService', () => {
  let service: ActivityService;

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

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
