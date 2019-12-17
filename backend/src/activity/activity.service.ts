import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, In, Like, Equal } from 'typeorm'
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'

import { ActivityDTO } from './activity.dto'
import { ActivityEntity } from './activity.entity'
import { UserEntity } from '../user/user.entity'

@Injectable()
export class ActivityService {
  private logger = new Logger('ActivityServiceLogger')
  private userRepository = getRepository(UserEntity)

  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>
  ) {}

  async showAll() {
    return await this.activityRepository.find()
  }

  async getUserActivities(openid: string) {
    const held = await this.activityRepository.find({
      where: {
        organizer: Equal(openid)
      }
    })

    const attended = await this.activityRepository.find({
      where: {
        participants: Like(`%${ openid }%`)
      }
    })

    return {
      held,
      attended
    }
  }

  // Return all activities including only the specified fields
  async showAllPartially(name: string, data: any) {
    let options = { select: data.fields }
    if (name) {
      options['where'] = {
        name: Like(`%${ name }%`)
      }
    }

    const activities = await this.activityRepository.find(options)

    return activities
  }

  async create(data: Partial<ActivityDTO>) {
    let activity = await this.activityRepository.create(data)
    activity.organizer = data.openid
    activity.administrators = []
    activity.administrators.push(data.openid)
    activity.site = data['site']
    activity.fields = data['fields']
    await this.activityRepository.save(activity)

    let user = await this.userRepository.findOne(data.openid)
    user.heldActivities.push(activity.id)
    await this.userRepository.save(user)

    return activity
  }

  async read(id: string) {
    try {
      const activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      return activity
    } catch(error) {
      this.logger.log(error)
      throw new HttpException(`Error when querying activity ${id}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, data: Partial<ActivityDTO>) {
    try {
      const activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      await this.activityRepository.update(id, data)

      return this.activityRepository.findOne(id)
    } catch(error) {
      this.logger.log(error)
      throw new HttpException(`Error when querying activity ${id}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateUserHeldActivities(activity: ActivityEntity) {
    const openid = activity.organizer
    let organizer = await this.userRepository.findOne(openid)
    const index = organizer.heldActivities.findIndex(act => {
      return act === activity.id
    })

    organizer.heldActivities.splice(index, 1)
    await this.userRepository.save(organizer)
  }

  async updateUserAttendedActivities(activity: ActivityEntity) {
    for (let participant of activity.participants) {
      const user = await this.userRepository.findOne(participant['openid'])
      const index = user.attendedActivities.findIndex(act => {
        return act === activity.id
      })

      user.attendedActivities.splice(index, 1)
      await this.userRepository.save(user)
    }
  }

  async destroy(id: string) {
    try {
      const activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      this.updateUserHeldActivities(activity)
      this.updateUserAttendedActivities(activity)
      await this.activityRepository.delete(id)

      return activity
    } catch (error) {
      this.logger.log(error)
      throw new HttpException(`Error when querying activity ${id}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // Clear all users' heldActivities and attendedActivities fields
  async clearHeldAttended() {
    let users = await this.userRepository.find()
    for (let user of users) {
      user.heldActivities = []
      user.attendedActivities = []
      await this.userRepository.save(user)
    }
  }

  async destroyAll() {
    await this.clearHeldAttended()
    await this.activityRepository.clear()
    return { delete: 'success' }
  }

  async uploadPicture(file: any, data: any) {
    const activity = await this.activityRepository.findOne(data.pictureId)
    activity.pictures.push(file.filename)
    await this.activityRepository.save(activity)

    return { picture: file.filename}
  }

  async signup(data: any) {
    const activity = await this.activityRepository.findOne(data.id)
    activity.participants.push(data.participant)
    await this.activityRepository.save(activity)

    return activity
  }

  async changeSignupInfo(id: string, openid: string, data: any) {
    let activity = await this.activityRepository.findOne(id)

    for (let par of activity.participants) {
      if (par['openid'] === openid) {
        for (let inf of data.info) {
          let res = par['info'].find(info => {
            return info.field === inf.field
          })

          if (res) {
            res.value = inf.value
          } else {
            par['info'].push(inf)
          }
        }
        await this.activityRepository.save(activity)
        return { change: 'success' }
      }
    }

    return null
  }

  async cancelSignup(id: string, openid: string) {
    let activity = await this.activityRepository.findOne(id)
    let pars = activity.participants

    let index = pars.findIndex(par => {
      return par['openid'] === openid
    })

    if (index != -1) {
      pars.splice(index, 1)
      await this.activityRepository.save(activity)
    }

    return { cancel: 'success' }
  }

  async signin(id: string, openid: string, code: string) {
    try {
      let activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      let participant = activity.participants.find(parti => {
        return parti['openid'] === openid
      })

      if (!participant) {
        throw new HttpException(`Participant ${openid} not found in activity ${id}`, HttpStatus.NOT_FOUND)
      }

      // Check the sign in code
      if (parseInt(code) === activity.signinCode) {
        participant['signedIn'] = true
        await this.activityRepository.save(activity)
        return { signin: 'success' }
      }

      return { signin: 'fail' }
    } catch (error) {
      this.logger.log(error)
      throw new HttpException(`Error when querying activity ${id}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async checkSignIn(id: string, openid: string) {
    try {
      let activity = await this.activityRepository.findOne(id)
      if (!activity) {
        throw new HttpException(`Activity ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      let participant = activity.participants.find(parti => {
        return parti['openid'] === openid
      })

      if (!participant) {
        throw new HttpException(`Participant ${openid} not found in activity ${id}`, HttpStatus.NOT_FOUND)
      }

      return { signedIn: participant['signedIn'] }
    } catch (error) {
      this.logger.log(error)
      throw new HttpException(`Error when querying activity ${id}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}

