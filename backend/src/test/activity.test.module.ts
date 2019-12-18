import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like, Equal} from 'typeorm';

import { ActivityDTO } from './../activity/activity.dto'
import { ActivityEntity } from './../activity/activity.entity';
import { ActivityService } from './../activity/activity.service';
import { ActivityController } from './../activity/activity.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common'

const mockActivityRepository = {
	data: [
      { id: "f12605cd-1008-c89e-29d7-e368344-f7e99",name: "tsinghua-2017-party",actStart: "2019-12-21 19:30",actEnd: "2019-12-21 21:30",site: {name:'Taoli',address:'Zijing Lu'},fields:[{address:"Florence"},{address:"Beijing"}],intro:"dsafsdfsadf",maxParticipants: "50",phone: "1345678945612",signupStart: '2019-12-15 19:30', signupEnd: '2019-12-20 19:30',signinCode: 13,pictrues: ["123.jpg","456.jpg"],participants:[{id:'aaa'},{id:'bbb'}],administrators:['ccc','ddd','eee'],organizer:'fff'},

      { id: "7dd1c8c7-87e5-06f8-efad-2896903f2e65",name: "university-2017-party",actStart: "2019-12-22 19:30",actEnd: "2019-12-25 21:30",site: {name:'Zijin',address:'Qinghua Lu'},fields:[{address:"Paris"},{address:"Beijing"}],intro:"aaaaaaaa",maxParticipants: "80",phone: "1345558945612",signupStart: '2019-12-18 19:30', signupEnd: '2019-12-20 19:30',signinCode: 813,pictrues: ["111.jpg","444.jpg"],participants:[{id:'ddd',openid: 'Liu Dehua',info:''},{id:'ccc',openid: 'Jin Chenwu',info:''},{id:'fff',openid: 'Zhu Yuanzhang',info:''}],administrators:['ccc','ddd','eee'],organizer:'kkk'},
    ],
	find:function(condition) {
		if(condition === undefined){
			return this.data }
		else{
			let data = []
			if (condition.where.organizer != undefined){
				let value = condition.where.organizer._value
				for(let i in this.data){
					if (value === this.data[i].organizer){
						data.push(this.data[i])
						}
					}
				}

			else{
				let value = condition.where.participants._value.split('%')[1]
				for (let i in this.data){
					for(let j in this.data[i].participants){
						if (value === this.data[i].participants[j].id){ data.push(this.data[i]) }
						}
					}
				}
			return data
			}

		},

	findOne:function(id:string) { 
		for(let i in this.data){
			if(this.data[i].id == id)
				return this.data[i]
		}
		return false},

	update:function(id:string,data: Partial<ActivityDTO>) {
		for(let i in this.data){
			if(this.data[i].id == id){
				for( let item in data){
					if (item === 'openid'){
						this.data[i].openid = data[item]
						}
					else if (item === 'name'){
						console.log('name')
						this.data[i].name = data[item]
					}
					else if (item === 'intro'){
						this.data[i].intro = data[item]
					}
					else if (item === 'maxParticipants'){
						this.data[i].maxParticipants = data[item]
					}
					else if (item === 'actStart'){
						this.data[i].actStart = data[item]
					}
					else if (item === 'actEnd'){
						this.data[i].actEnd = data[item]
					}
					else if (item === 'phone'){
						this.data[i].phone = data[item]
					}
					else if (item === 'signinCode'){
						this.data[i].signinCode = Number(data[item])
					}
					else if (item === 'signupStart'){
						this.data[i].signupStart = data[item]
					}
					else if (item === 'signupEnd'){
						this.data[i].signupEnd = data[item]
					}
				}
				return true;}
			}
		return false
		},

	create:function(data: Partial<ActivityDTO>) {
			let new_item = data
			return new_item
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

	delete:function(id:string) {
		function isNOtChosen(element, index, array) { 
			if(element.id != id) return element; 
			} 
		this.data = this.data.filter(isNOtChosen);
		}
  }; 

@Module({
  providers: [ActivityService,
          {
            provide: getRepositoryToken(ActivityEntity),
            useValue: mockActivityRepository,
           },
     ],
  controllers: [ActivityController],
  exports: []
})
export class ActivityModule {}
