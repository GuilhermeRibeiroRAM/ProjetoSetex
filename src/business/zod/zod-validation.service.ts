import { IZodValidationService } from '@/business/interfaces/zod-validation.interface';
import { Injectable } from '@nestjs/common';
import { AnyZodObject, ZodIssue } from 'zod';

@Injectable()
export class ZodValidationService implements IZodValidationService {
  constructor() {}

  validateArray<T>(schema: AnyZodObject, data: T[]): T[] {
    const validatedData: T[] = [];
    data.forEach((currentData) => {
      const result = this.validateObject(schema, currentData);
      if (result.success) {
        validatedData.push(result.data);
      }
    });

    return validatedData;
  }

  validateObject<T>(
    schema: AnyZodObject,
    data: T,
  ): { success: boolean; data?: T } {
    const result: any = schema.safeParse(data);

    if (!result.success) {
      console.log(
        `🟥 ZodError: ${result['error'].errors.map(
          (err: ZodIssue) => `Message: ${err.message}. Field: ${err.path}`,
        )}`,
        'validateObject (ZodError)',
      );
      console.log(result['error'], 'validateObject result[error]');
      console.log(JSON.stringify(data, null, 2), 'validateObject data');
      return { success: result.success };
    }

    return { success: result.success, data: result.data as T };
  }
}
