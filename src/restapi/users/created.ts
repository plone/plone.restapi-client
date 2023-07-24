import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  User as CreatedUserResponse,
  createUserDataSchema,
} from '../../interfaces/users';

export const createUserArgsSchema = z.object({
  data: createUserDataSchema,
  config: PloneClientConfigSchema,
});

export type CreatedUserArgs = z.infer<typeof createUserArgsSchema>;

export const createUser = async ({
  data,
  config,
}: CreatedUserArgs): Promise<CreatedUserResponse> => {
  const validatedArgs = createUserArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@users', options);
};

export const createUserMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'users'],
  mutationFn: ({ data }: Omit<CreatedUserArgs, 'config'>) =>
    createUser({ data, config }),
});
