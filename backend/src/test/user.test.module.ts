import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './../user/user.entity'
import { UserDTO } from '../user/user.dto'
import { UserService } from './../user/user.service'
import { UserController } from './../user/user.controller'
import { ConfigModule } from '../config/config.module'
import { getRepositoryToken } from '@nestjs/typeorm';

  const mockUserRepository = {
       data: [{id:'f12605cd-1008-c89e-29d7-e368344f7e99',username:'mirio',realname: 'Jin Chenwu',avatarUrl: 'wx-1.jpg',wechatId: 'sad78432afjlksadhasldsaf',idNumber: '77778888',email: '123@fake.com',address: 'Avenue Q',authed: true,phone: '1111111111',grade: '2017',department: 'Living',heldActivities: [], attendedActivities: [],},

              {id:'7dd1c8c7-87e5-06f8-efad-2896903f2e65',username:'masaki',realname: 'Liu Dehua',avatarUrl: 'wx-2.jpg',wechatId: 'aaa78432afjlksadhasldsaf',idNumber: '66668888',email: '321@fake.com',address: 'Avenue B',authed: true,phone: '2222222222',grade: '2010',department: 'Sports',heldActivities: [], attendedActivities: [],},
],

	findOne:function(id:string) { 
		for(let i in this.data){
			if(this.data[i].id == id)
				return this.data[i]
		}
		return false},

	find:function(condition) {
		if(condition === undefined){
			return this.data }
		},

	save:function(activity) {
		let flag = false
		for(let i in this.data){
			if (this.data[i].id === activity.id){
				this.data[i] = activity
				flag = true
				}
			}
		if (!flag){ this.data.push(activity) }
		console.log(this.data)
		},

	update:function(id:string,data: Partial<UserDTO>) {
		for(let i in this.data){
			if(this.data[i].id == id){
				for( let item in data){
					if (item === 'realname'){
						this.data[i].realname = data[item]
						}
					else if (item === 'phone'){
						this.data[i].phone = data[item]
					}
					else if (item === 'wechatId'){
						this.data[i].wechatId = Number(data[item])
					}
					else if (item === 'idNumber'){
						this.data[i].idNumber = data[item]
					}
					else if (item === 'email'){
						this.data[i].email = data[item]
					}
					else if (item === 'address'){
						this.data[i].address = data[item]
					}
				}
				return this.data[i];}
			}
		},
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
