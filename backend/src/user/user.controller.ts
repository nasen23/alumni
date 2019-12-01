import { Controller, Get, UsePipes, Post, Body } from '@nestjs/common'

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
    return resp
  }

  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: Object) {
    let resp = this.userService.login(data)
    return resp
  }
}
