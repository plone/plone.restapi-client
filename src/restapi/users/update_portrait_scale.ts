import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updateUserPortraitScaleDataSchema } from '../../interfaces/users';

export const updateUserPortraitScaleArgsSchema = z.object({
  path: z.string(),
  data: updateUserPortraitScaleDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateUserPortraitScaleArgs = z.infer<
  typeof updateUserPortraitScaleArgsSchema
>;

export const updateUserPortraitScale = async ({
  path,
  data,
  config,
}: UpdateUserPortraitScaleArgs): Promise<undefined> => {
  const validatedArgs = updateUserPortraitScaleArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateUserPortraitScalePath = `/@users/${validatedArgs.path}`;

  return apiRequest('patch', updateUserPortraitScalePath, options);
};

export const updateUserPortraitScaleMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'users'],
  mutationFn: ({ path, data }: Omit<UpdateUserPortraitScaleArgs, 'config'>) =>
    updateUserPortraitScale({ path, data, config }),
});
