import axios from 'axios'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UserEntity } from './user.entity'
import { ConfigService } from '../config/config.service'

@Injectable()
export class UserService {
  private readonly appId: string
  private readonly appSecret: string
  private readonly serverAddr: string
  private readonly wxServerAddr: string

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
  ) {
    this.appId = config.get('APP_ID')
    this.appSecret = config.get('APP_SECRET')
    this.serverAddr = config.get('SERVER_ADDR')
    this.wxServerAddr = config.get('WX_SERVER_ADDR')
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async auth() {
    try {
      const response = await axios.post(this.serverAddr, {
        appId: this.appId,
          appSecret: this.appSecret
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async login(data: Object) {
    try {
      const response = await axios.get(this.wxServerAddr, {
        params: {
          appid: data['appId'],
          secret: data['secret'],
          js_code: data['code'],
          grant_type: 'authorization_code'
        }
      })
      // authentication succeeded, add the user to the database
      if (response.data.openid) {
        let id = response.data.openid
        let user = await this.userRepository.findOne(id)
        if (!user) {
          user = new UserEntity()
          user.id = id
          user.authed = false
          user.grade = ''
          user.phone = ''
          user.username = ''
          user.department = ''

          await this.userRepository.save(user)
        }

        return { openid: id }
      } else {
        return {
          openid: ''
        }
      }
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
