import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  updateUserPortraitDataSchema as updateUserPortraitGetDataSchema,
  User as UpdatePortraitGetReponse,
} from '../../interfaces/users';

export const updateUserPortraitGetArgsSchema = z.object({
  path: z.string(),
  data: updateUserPortraitGetDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateUserPortraitGetArgs = z.infer<
  typeof updateUserPortraitGetArgsSchema
>;

export const updateUserPortraitGet = async ({
  path,
  data,
  config,
}: UpdateUserPortraitGetArgs): Promise<UpdatePortraitGetReponse> => {
  const validatedArgs = updateUserPortraitGetArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateUserPortraitGetPath = `/@users/${validatedArgs.path}`;

  return apiRequest('patch', updateUserPortraitGetPath, options);
};

export const updateUserPortraitGetMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'users'],
  mutationFn: ({ path, data }: Omit<UpdateUserPortraitGetArgs, 'config'>) =>
    updateUserPortraitGet({ path, data, config }),
});
