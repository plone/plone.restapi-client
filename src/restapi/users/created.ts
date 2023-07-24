import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  User as createdUserResponse,
  createdUserDataSchema,
} from '../../interfaces/users';

export const createdUserArgsSchema = z.object({
  data: createdUserDataSchema,
  config: PloneClientConfigSchema,
});

export type createdUserArgs = z.infer<typeof createdUserArgsSchema>;

export const createdUser = async ({
  data,
  config,
}: createdUserArgs): Promise<createdUserResponse> => {
  const validatedArgs = createdUserArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@users', options);
};

export const createdUserMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'users'],
  mutationFn: ({ data }: Omit<createdUserArgs, 'config'>) =>
    createdUser({ data, config }),
});
