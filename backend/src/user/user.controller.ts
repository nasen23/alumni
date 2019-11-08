import { Controller, Get, UsePipes, Post } from '@nestjs/common'

import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { ValidationPipe } from '../shared/validation.pipe'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findALl() {
    return this.userService.findAll()
  }

  @Post('/auth')
  @UsePipes(new ValidationPipe())
  auth() {
    let resp = this.userService.auth()
    console.log(typeof(resp))
    console.log(resp)
    return resp
  }
}
