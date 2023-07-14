import { handleRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';

export const deleteGroupArgsSchema = z.object({
  path: z.string(),
  config: PloneClientConfigSchema,
});

type DeleteGroupArgs = z.infer<typeof deleteGroupArgsSchema>;

export const deleteGroup = async ({
  path,
  config,
}: DeleteGroupArgs): Promise<undefined> => {
  const validatedArgs = deleteGroupArgsSchema.parse({
    path,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const deleteGroupPath = `/@groups/${validatedArgs.path}`;

  return handleRequest('delete', deleteGroupPath, options);
};

export const deleteGroupMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'groups'],
  mutationFn: ({ path }: Omit<DeleteGroupArgs, 'config'>) =>
    deleteGroup({ path, config }),
});
