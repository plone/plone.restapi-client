import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updateUserDataSchema } from '../../interfaces/users';

export const updateUserArgsSchema = z.object({
  path: z.string(),
  data: updateUserDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateUserArgs = z.infer<typeof updateUserArgsSchema>;

export const updateUser = async ({
  path,
  data,
  config,
}: UpdateUserArgs): Promise<undefined> => {
  const validatedArgs = updateUserArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateUserPath = `/@users/${validatedArgs.path}`;

  return handleRequest('patch', updateUserPath, options);
};

export const updateUserMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'users'],
  mutationFn: ({ path, data }: Omit<UpdateUserArgs, 'config'>) =>
    updateUser({ path, data, config }),
});
