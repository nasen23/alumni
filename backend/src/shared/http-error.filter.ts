import { Catch, ArgumentsHost, HttpException, ExceptionFilter, Logger } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()
    const respStatus = exception.getStatus()

    const errorResponse = {
      code: respStatus,
      timestamp: new Date().toLocaleTimeString(),
      path: request.url,
      method: request.method,
      message: exception.message.error || exception.message || null
    }

    Logger.error(`${request.url}`, JSON.stringify(errorResponse), 'ExceptionFilter')

    response.status(respStatus).json(errorResponse)
  }
}
