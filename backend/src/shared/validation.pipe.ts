import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common'

import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'Validation failed: No body params submitted',
        HttpStatus.BAD_REQUEST
      )
    }

    const { metatype } = metadata
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new HttpException(`Validation failed: ${this.formatter(errors)}`, HttpStatus.BAD_REQUEST)
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatter(errors: any[]) {
    return errors.map(err => {
      for (let property in err.constraints) {
        return err.constraints[property]
      }
    }).join(', ')
  }

  private isEmpty(value: any) {
    return Object.keys(value).length === 0
  }
}
