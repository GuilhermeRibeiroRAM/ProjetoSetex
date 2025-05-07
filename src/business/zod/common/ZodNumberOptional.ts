import { z } from 'zod';

const ZodNumberOptional = () => {
  return z.number().optional();
};

export default ZodNumberOptional;
