import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IErrorResponse } from '../dtos/common/custom-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let errorResponse: IErrorResponse;

    console.error(
      `[${request.method}] ${request.url} -`,
      JSON.stringify(exception, null, 2),
    );

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as IErrorResponse;
      errorResponse = {
        success: false,
        errors: exceptionResponse.errors || [],
        code: exception.getStatus(),
      };
    } else {
      errorResponse = {
        success: false,
        errors: [
          {
            key: 'general.errors.defaulterror',
            value: 'An unexpected error occurred.',
          },
        ],
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }

    response.status(errorResponse.code).json(errorResponse);
  }
}
