import axios from 'axios'
import { Repository } from 'typeorm'
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { UserDTO } from '../user/user.dto'
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
    this.appId = this.config.get('APP_ID')
    this.appSecret = this.config.get('APP_SECRET')
    this.serverAddr = this.config.get('SERVER_ADDR')
    this.wxServerAddr = this.config.get('WX_SERVER_ADDR')
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async read(openid: string) {
    return await this.userRepository.findOne(openid)
  }

  async auth() {
    try {
      const response = await axios.post(this.serverAddr, {
        appId: this.appId,
          appSecret: this.appSecret
      })
      return response.data
    } catch (error) {
      Logger.log(error)
    }
  }

  async update(id: string, data: Partial<UserDTO>) {
    try {
      Logger.log(data)
      let user = await this.userRepository.findOne(id)
      if (!user) {
        throw new HttpException(`User ${id} Not Found`, HttpStatus.NOT_FOUND)
      }

      await this.userRepository.update(id, data)

      return user
    } catch(error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND)
    }
  }

  async login(data: any) {
    try {
      const response = await axios.get(this.wxServerAddr, {
        params: {
          appid: data.appId,
          secret: data.secret,
          js_code: data.code,
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
          user.username = data.username
          user.department = ''
          user.avatarUrl = data.avatarUrl

          await this.userRepository.save(user)
        } else {
          user.username = data.username
          user.avatarUrl = data.avatarUrl
          await this.userRepository.save(user)
        }

        return { openid: id }
      } else {
        return { openid: '' }
      }
    } catch (error) {
      Logger.log(error)
    }
  }
}
