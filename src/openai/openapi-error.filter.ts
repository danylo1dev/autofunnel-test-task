import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { OpenAIError } from 'openai';

@Catch(OpenAIError)
export class OpenapiErrorFilter implements ExceptionFilter {
  catch(exception: OpenAIError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.BAD_GATEWAY).json({
      statusCode: HttpStatus.BAD_GATEWAY,
      message: exception,
    });
  }
}
