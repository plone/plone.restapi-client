import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updateUserPortraitDataSchema } from '../../interfaces/users';

export const updateUserPortraitArgsSchema = z.object({
  path: z.string(),
  data: updateUserPortraitDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateUserPortraitArgs = z.infer<
  typeof updateUserPortraitArgsSchema
>;

export const updateUserPortrait = async ({
  path,
  data,
  config,
}: UpdateUserPortraitArgs): Promise<undefined> => {
  const validatedArgs = updateUserPortraitArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateUserPortraitPath = `/@users/${validatedArgs.path}`;

  return apiRequest('patch', updateUserPortraitPath, options);
};

export const updateUserPortraitMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'users'],
  mutationFn: ({ path, data }: Omit<UpdateUserPortraitArgs, 'config'>) =>
    updateUserPortrait({ path, data, config }),
});
