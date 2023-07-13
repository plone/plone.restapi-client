import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { createGroupDataSchema } from '../../interfaces/groups';

export const updateGroupArgsSchema = z.object({
  data: createGroupDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateGroupArgs = z.infer<typeof updateGroupArgsSchema>;

export const updateGroup = async ({
  data,
  config,
}: UpdateGroupArgs): Promise<undefined> => {
  const validatedArgs = updateGroupArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return handleRequest('post', '/@groups', options);
};

export const updateGroupMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'groups'],
  mutationFn: ({ data }: Omit<UpdateGroupArgs, 'config'>) =>
    updateGroup({ data, config }),
});
