import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { ConfigService } from '../config/config.service';


describe('User Controller', () => {
  let controller: UserController;
  let userService: UserService;

  var mockRepository = {
       data: [{id:'f12605cd-1008-c89e-29d7-e368344f7e99',username:'mirio',password:'123'},
              {id:'7dd1c8c7-87e5-06f8-efad-2896903f2e65',username:'masaki',password:'456'},],
     };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService,
         {
           provide: getRepositoryToken(UserEntity),
           useValue: mockRepository,
         },
         {
           provide: ConfigService,
           useValue: new ConfigService(`test.env`),
         },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
