import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updateUserPotraitDataSchema } from '../../interfaces/users';

export const updateUserPotraitArgsSchema = z.object({
  path: z.string(),
  data: updateUserPotraitDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateUserPotraitArgs = z.infer<typeof updateUserPotraitArgsSchema>;

export const updateUserPotrait = async ({
  path,
  data,
  config,
}: UpdateUserPotraitArgs): Promise<undefined> => {
  const validatedArgs = updateUserPotraitArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateUserPotraitPath = `/@users/${validatedArgs.path}`;

  return handleRequest('patch', updateUserPotraitPath, options);
};

export const updateUserPotraitMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'users'],
  mutationFn: ({ path, data }: Omit<UpdateUserPotraitArgs, 'config'>) =>
    updateUserPotrait({ path, data, config }),
});
