import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  User as CreateUserResponse,
  createUserDataSchema,
} from '../../interfaces/users';

export const createUserArgsSchema = z.object({
  data: createUserDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateUserArgs = z.infer<typeof createUserArgsSchema>;

export const createUser = async ({
  data,
  config,
}: CreateUserArgs): Promise<CreateUserResponse> => {
  const validatedArgs = createUserArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return handleRequest('post', '/@users', options);
};

export const createUserMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'users'],
  mutationFn: ({ data }: Omit<CreateUserArgs, 'config'>) =>
    createUser({ data, config }),
});
