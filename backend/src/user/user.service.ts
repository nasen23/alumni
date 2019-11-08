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

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly config: ConfigService,
  ) {
    this.appId = config.get('APP_ID')
    this.appSecret = config.get('APP_SECRET')
    this.serverAddr = config.get('SERVER_ADDR')
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
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
}
