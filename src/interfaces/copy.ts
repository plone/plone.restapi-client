import { z } from 'zod';

interface CopyObject {
  source: string;
  target: string;
}

export interface GetCopyResponse extends Array<CopyObject> {}

export const copyDataSchema = z.object({
  source: z.string(),
});

export const copyMultipleDataSchema = z.object({
  source: z.array(z.string()),
});
