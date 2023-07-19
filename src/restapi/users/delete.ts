import { handleRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';

export const deleteUserArgsSchema = z.object({
  path: z.string(),
  config: PloneClientConfigSchema,
});

type DeleteUserArgs = z.infer<typeof deleteUserArgsSchema>;

export const deleteUser = async ({
  path,
  config,
}: DeleteUserArgs): Promise<undefined> => {
  const validatedArgs = deleteUserArgsSchema.parse({
    path,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const deleteUserPath = `/@users/${validatedArgs.path}`;

  return handleRequest('delete', deleteUserPath, options);
};

export const deleteUserMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'users'],
  mutationFn: ({ path }: Omit<DeleteUserArgs, 'config'>) =>
    deleteUser({ path, config }),
});
