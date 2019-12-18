import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from '../activity/activity.controller';
import { ActivityService } from '../activity/activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ActivityEntity } from '../activity/activity.entity'

describe('Activity Controller', () => {
  let controller: ActivityController;
  let service: ActivityService;

const mockRepository = {
       data: [
      { id: "f12605cd-1008-c89e-29d7-e368344-f7e99",name: "tsinghua-2017-party",actStart: "2019-12-21 19:30",actEnd: "2019-12-21 21:30",site: {name:'Taoli',address:'Zijing Lu'},fields:[{address:"Florence"},{address:"Beijing"}],intro:"dsafsdfsadf",maxParticipants: "50",phone: "1345678945612",signupStart: '2019-12-15 19:30', signupEnd: '2019-12-20 19:30',signinCode: 13,pictrues:["123.jpg","456.jpg"],participants:[{name:'aaa'},{name:'bbb'}],administrators:['ccc','ddd','eee'],organizer:'fff'},
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
