import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './app.test.module';

import { ActivityService } from '../activity/activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { ActivityEntity } from '../activity/activity.entity'

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
      .get('/activity/all')
      .expect(200)
  });

  it('/ (get a user activity)',() =>{
      return request(app.getHttpServer())
      .get('/activity/user')
      .query({
	openid:'fff'
	})
      .expect(200)
      .then((response) => { console.log(response.body) })
  });


  it('/ (get a id)',() =>{
      return request(app.getHttpServer())
      .get('/activity/get')
      .query({'id':'f12605cd-1008-c89e-29d7-e368344-f7e99'})
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (change a activity)',() =>{
      return request(app.getHttpServer())
      .put('/activity/put')
      .query({'id':'f12605cd-1008-c89e-29d7-e368344-f7e99'})
      .send({
	intro: 'The party will be held another day',
	phone: '111111111111',
	})
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (delete a activity)',() =>{
      return request(app.getHttpServer())
      .delete('/activity/delete')
      .query({'id':'f12605cd-1008-c89e-29d7-e368344-f7e99'})
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (get all known activity after deleting a activity)',() =>{
      return request(app.getHttpServer())
      .get('/activity/all')
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (get a id after delete one)',() =>{
      return request(app.getHttpServer())
      .get('/activity/get')
      .query({ id:'f12605cd-1008-c89e-29d7-e368344-f7e99'})
  });

  it('/ (sign up to an activity)',() =>{
      return request(app.getHttpServer())
      .post('/activity/signup')
      .send({ 
	id: '7dd1c8c7-87e5-06f8-efad-2896903f2e65',
	participant: {id: 'vvv'},
	})
  });

  it('/ (delete signup info of an activity)',() =>{
      return request(app.getHttpServer())
      .delete('/activity/signup')
      .query({ 
	id: '7dd1c8c7-87e5-06f8-efad-2896903f2e65',
	openid: 'Liu Dehua',
	})
      .then((response) => { console.log(response.body) })
  });

  it('/ (get details of an user)',() =>{
      return request(app.getHttpServer())
      .get('/user/get')
      .query({ 
	openid: 'f12605cd-1008-c89e-29d7-e368344f7e99',
	})
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (get details of all user)',() =>{
      return request(app.getHttpServer())
      .get('/user/all')
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (get auth)',() =>{
      return request(app.getHttpServer())
      .post('/user/auth')
      .expect(201)
      .then((response) => { console.log(response.body) })
  });

  it('/ (update user data)',() =>{
      return request(app.getHttpServer())
      .put('/user/put')
      .query({openid: 'f12605cd-1008-c89e-29d7-e368344f7e99'})
      .send({
	realname: 'Zhu Yuanzhang',
	phone: '3333333333',
	wechatId: 'dwqeasdh4545-adasaas',
	idNumber: '33334444',
	email: '555@fake.com',
	address: 'Avenue B'
	})
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  it('/ (get details of all user after updating)',() =>{
      return request(app.getHttpServer())
      .get('/user/all')
      .expect(200)
      .then((response) => { console.log(response.body) })
  });

  afterAll(async () => {
    await app.close();
  });

});
