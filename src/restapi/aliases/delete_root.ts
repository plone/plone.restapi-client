import { apiRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { deleteAliasesDataSchema } from '../../interfaces/aliases';

export const deleteAliasesRootArgsSchema = z.object({
  path: z.string(),
  data: deleteAliasesDataSchema,
  config: PloneClientConfigSchema,
});

type DeleteAliasesRootArgs = z.infer<typeof deleteAliasesRootArgsSchema>;

export const deleteAliasesRoot = async ({
  path,
  data,
  config,
}: DeleteAliasesRootArgs): Promise<undefined> => {
  const validatedArgs = deleteAliasesRootArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('delete', validatedArgs.path, options);
};

export const deleteAliasesRootMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'aliases'],
  mutationFn: ({ path, data }: Omit<DeleteAliasesRootArgs, 'config'>) =>
    deleteAliasesRoot({ path, data, config }),
});
