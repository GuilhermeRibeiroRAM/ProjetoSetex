import { z } from 'zod';

const ZodStringOptional = () => {
  return z.string().trim().optional();
};

export default ZodStringOptional;
