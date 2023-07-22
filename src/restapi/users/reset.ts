import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { resetUserDataSchema } from '../../interfaces/users';

export const resetUserArgsSchema = z.object({
  path: z.string(),
  data: resetUserDataSchema,
  config: PloneClientConfigSchema,
});

export type ResetUserArgs = z.infer<typeof resetUserArgsSchema>;

export const resetUser = async ({
  path,
  data,
  config,
}: ResetUserArgs): Promise<undefined> => {
  const validatedArgs = resetUserArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const resetUserPath = `@users/${validatedArgs.path}/reset-password`;

  return handleRequest('patch', resetUserPath, options);
};

export const resetUserMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'user'],
  mutationFn: ({ path, data }: Omit<ResetUserArgs, 'config'>) =>
    resetUser({ path, data, config }),
});
