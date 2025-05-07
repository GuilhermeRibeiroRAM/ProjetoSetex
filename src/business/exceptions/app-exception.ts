import { HttpException, HttpStatus } from '@nestjs/common';

export interface ICustomError {
  key: string;
  value?: string;
  params?: Map<string, string>;
}

export class AppException extends HttpException {
  constructor(
    errors: ICustomError[],
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        success: false,
        errors,
      },
      status,
    );
  }
}
