import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ActivityEntity } from './activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity])],
  providers: [ActivityService],
  controllers: [ActivityController]
})
export class ActivityModule {}
