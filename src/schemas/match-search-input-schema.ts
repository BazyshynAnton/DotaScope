import { z } from 'zod';

export const matchSearchInputSchema = z
  .string()
  .min(10, 'Minimum ID length is 10 digits')
  .max(12, 'Maximum ID length is 12 digits');
