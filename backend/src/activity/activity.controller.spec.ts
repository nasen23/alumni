import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ActivityEntity } from './activity.entity'

describe('Activity Controller', () => {
  let controller: ActivityController;
  let service: ActivityService;

const mockRepository = {
       data: [
      { id: 'f12605cd-1008-c89e-29d7-e368344f7e99', actName: 'party', actSite: 'TaoLi',actIntro:'dsafsdfsadf' },
      { id: '7dd1c8c7-87e5-06f8-efad-2896903f2e65', actName: 'PARTY', actSite: 'ZiJing',actIntro:'qweqeqeqqwe' },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
            ActivityService,
           {
            provide: getRepositoryToken(ActivityEntity),
            useValue: mockRepository,
           },
         ],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});
