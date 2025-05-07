import { AnyZodObject } from 'zod';

export interface IZodValidationService {
  validateArray<T>(schema: AnyZodObject, data: T[]): T[];
  validateObject<T>(
    schema: AnyZodObject,
    data: T,
  ): { success: boolean; data?: T };
}
