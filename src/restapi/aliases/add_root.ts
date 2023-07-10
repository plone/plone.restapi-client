import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { createAliasesRootDataSchema } from '../../interfaces/aliases';

export const createAliasesRootArgsSchema = z.object({
  data: createAliasesRootDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateAliasesRootArgs = z.infer<typeof createAliasesRootArgsSchema>;

export const createAliasesRoot = async ({
  data,
  config,
}: CreateAliasesRootArgs): Promise<undefined> => {
  const validatedArgs = createAliasesRootArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return handleRequest('post', '/@aliases', options);
};

export const createAliasesRootMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'aliases'],
  mutationFn: ({ data }: Omit<CreateAliasesRootArgs, 'config'>) =>
    createAliasesRoot({ data, config }),
});
