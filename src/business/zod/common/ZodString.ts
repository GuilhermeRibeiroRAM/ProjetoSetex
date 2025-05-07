import { z } from 'zod';

const ZodStringRequired = () => {
  return z.string().trim().min(1);
};

export default ZodStringRequired;
