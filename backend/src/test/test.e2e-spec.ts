import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.test.module';

import { ActivityService } from './../activity/activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ActivityEntity } from './../activity/activity.entity'

describe('AppController (e2e)', () => {
  let app;


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (get all known activity)',() =>{
      return request(app.getHttpServer())
      .get('/activity')
      .expect(200)
      .then((response) => { 
		console.log("Get all known activity")
		console.log(response.body) })
  });

  it('/ (get a known activity)',() =>{
      return request(app.getHttpServer())
      .get('/activity/f12605cd-1008-c89e-29d7-e368344f7e99')
      .expect(200)
  });

  it('/ (change a known activity)',() =>{
      return request(app.getHttpServer())
      .put('/activity/f12605cd-1008-c89e-29d7-e368344f7e99')
      .send({
        "id":"f12605cd-1008-c89e-29d7-e368344f7e99",
        "actName":"NEW PARTY",
        "actSite":"Qingqing",
	"actIntro":"test a new activity",
      })
      .expect(200)
  });


  it('/ (create a unknown activity)',() =>{
      return request(app.getHttpServer())
      .post('/activity')
      .send({
        "id":"a0578639-2bf5-2c5b-59c5-d24d357d3045",
        "actName":"NEW PARTY",
        "actSite":"Qingqing",
	"actIntro":"test a new activity",
      })
      .expect(201)
      .then((response) => { })
  });

  it('/ (get all known activity after created and changed)',() =>{
      return request(app.getHttpServer())
      .get('/activity')
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (delete a known activity)',() =>{
      return request(app.getHttpServer())
      .delete('/activity/7dd1c8c7-87e5-06f8-efad-2896903f2e65')
      .expect(200)
      .then((response) => { })
  });

  it('/ (get all known activity after created and changed and deleted)',() =>{
      return request(app.getHttpServer())
      .get('/activity')
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (get a unknown activity)',() =>{
      return request(app.getHttpServer())
      .get('/activity/f12605cd')
      .expect(404)
  });

  it('/ (create a wrong activity)',() =>{
      return request(app.getHttpServer())
      .post('/activity')
      .send({
        "id":"a0578639",
        "actName":"NEW PARTY",
        "actSite":"Qingqing",
	"actIntro":"test a new activity",
      })
      .expect(201)
      .then((response) => { })
  });

  afterAll(async () => {
    await app.close();
  });

});
