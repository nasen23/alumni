import {IsString} from "class-validator"

export class UserDTO {
  readonly id: string

  @IsString()
  realname: string

  @IsString()
  phone: string

  @IsString()
  wechatId: string

  @IsString()
  idNumber: string

  @IsString()
  email: string

  @IsString()
  address: string
}
