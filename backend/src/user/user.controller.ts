import { Controller, Get, UsePipes, Post, Body, Query, Put } from '@nestjs/common'

import { UserDTO } from '../user/user.dto'
import { UserService } from './user.service'
import { ValidationPipe } from '../shared/validation.pipe'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get')
  readUser(@Query('openid') id: string) {
    return this.userService.read(id)
  }

  @Get('all')
  findAll() {
    return this.userService.findAll()
  }

  @Post('auth')
  @UsePipes(new ValidationPipe())
  auth() {
    const resp = this.userService.auth()
    return resp
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: object) {
    const resp = this.userService.login(data)
    return resp
  }

  @Put('put')
  updateUser(@Query('openid') id: string, @Body() data: Partial<UserDTO>) {
    return this.userService.update(id, data)
  }
}
