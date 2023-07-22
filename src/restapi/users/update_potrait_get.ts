import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  updateUserPotraitDataSchema as updateUserPotraitGetDataSchema,
  User as UpdatePotraitGetReponse,
} from '../../interfaces/users';

export const updateUserPotraitGetArgsSchema = z.object({
  path: z.string(),
  data: updateUserPotraitGetDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateUserPotraitGetArgs = z.infer<
  typeof updateUserPotraitGetArgsSchema
>;

export const updateUserPotraitGet = async ({
  path,
  data,
  config,
}: UpdateUserPotraitGetArgs): Promise<UpdatePotraitGetReponse> => {
  const validatedArgs = updateUserPotraitGetArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateUserPotraitGetPath = `/@users/${validatedArgs.path}`;

  return handleRequest('patch', updateUserPotraitGetPath, options);
};

export const updateUserPotraitGetMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'users'],
  mutationFn: ({ path, data }: Omit<UpdateUserPotraitGetArgs, 'config'>) =>
    updateUserPotraitGet({ path, data, config }),
});
