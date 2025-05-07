import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .nonempty('general.validations.emptySpaces')
    .max(70, 'general.validations.invalidNameLength')
    .refine((val) => (val ? val.trim().length > 0 : true), {
      message: 'general.validations.emptySpaces',
    }),
  password: z
    .string()
    .min(6, 'auth.validations.shortPassword')
    .max(20, 'auth.validations.invalidPassword')
    .refine((val) => (val ? val.trim().length > 0 : true), {
      message: 'general.validations.emptySpaces',
    })
    .optional(),
  email: z.string().email(),
});
