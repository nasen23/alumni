import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityDTO } from './../activity/activity.dto'
import { ActivityEntity } from './../activity/activity.entity';
import { ActivityService } from './../activity/activity.service';
import { ActivityController } from './../activity/activity.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
const mockActivityRepository = {
	data: [
      { id: "f12605cd-1008-c89e-29d7-e368344f7e99", actName: 'party', actSite: 'TaoLi',actIntro:'dsafsdfsadf' },
      { id: "7dd1c8c7-87e5-06f8-efad-2896903f2e65", actName: 'PARTY', actSite: 'ZiJing',actIntro:'qweqeqeqqwe' },
    ],
	find:function() { return this.data },

	findOne:function(id:string) { 
		for(let i in this.data){
			if(this.data[i].id == id)
				return this.data[i]
		}
		return false},

	update:function(id:string,data: Partial<ActivityDTO>) {
		for(let i in this.data){
			if(this.data[i].id == id){
				this.data[i] = data
				return true;}
			}
		return false
		},

	create:function(data: Partial<ActivityDTO>) {
			let new_item = data
			return new_item
		},
	save:function(activity) {
		this.data.push(activity)
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
