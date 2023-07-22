import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { copyDataSchema, createCopyResponse } from '../../interfaces/copy';

export const createCopyArgsSchema = z.object({
  data: copyDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateCopyArgs = z.infer<typeof createCopyArgsSchema>;

export const createCopy = async ({
  data,
  config,
}: CreateCopyArgs): Promise<createCopyResponse> => {
  const validatedArgs = createCopyArgsSchema.parse({
    data,
    config,
  });

  const copyPath = `/@copy`;

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };
  return handleRequest('post', copyPath, options);
};

export const createCopyMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'copy'],
  mutationFn: ({ data }: Omit<CreateCopyArgs, 'config'>) =>
    createCopy({ data, config }),
});
