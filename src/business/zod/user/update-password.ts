import { z } from 'zod';

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, 'auth.validations.shortPassword')
    .max(20, 'auth.validations.invalidPassword')
    .refine((val) => (val ? val.trim().length > 0 : true), {
      message: 'general.validations.emptySpaces',
    }),
});
