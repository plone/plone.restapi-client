import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updateUserPotraitScaleDataSchema } from '../../interfaces/users';

export const updateUserPotraitScaleArgsSchema = z.object({
  path: z.string(),
  data: updateUserPotraitScaleDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateUserPotraitScaleArgs = z.infer<
  typeof updateUserPotraitScaleArgsSchema
>;

export const updateUserPotraitScale = async ({
  path,
  data,
  config,
}: UpdateUserPotraitScaleArgs): Promise<undefined> => {
  const validatedArgs = updateUserPotraitScaleArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateUserPotraitScalePath = `/@users/${validatedArgs.path}`;

  return handleRequest('patch', updateUserPotraitScalePath, options);
};

export const updateUserPotraitScaleMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'users'],
  mutationFn: ({ path, data }: Omit<UpdateUserPotraitScaleArgs, 'config'>) =>
    updateUserPotraitScale({ path, data, config }),
});
