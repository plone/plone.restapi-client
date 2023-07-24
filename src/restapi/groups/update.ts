import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updateGroupDataSchema } from '../../interfaces/groups';

export const updateGroupArgsSchema = z.object({
  path: z.string(),
  data: updateGroupDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateGroupArgs = z.infer<typeof updateGroupArgsSchema>;

export const updateGroup = async ({
  path,
  data,
  config,
}: UpdateGroupArgs): Promise<undefined> => {
  const validatedArgs = updateGroupArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateGroupPath = `/@groups/${validatedArgs.path}`;

  return apiRequest('patch', updateGroupPath, options);
};

export const updateGroupMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'groups'],
  mutationFn: ({ path, data }: Omit<UpdateGroupArgs, 'config'>) =>
    updateGroup({ path, data, config }),
});
