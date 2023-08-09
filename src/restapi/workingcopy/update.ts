import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';

export const updateWorkingcopyArgsSchema = z.object({
  path: z.string(),
  config: PloneClientConfigSchema,
});

export type UpdateWorkingcopyArgs = z.infer<typeof updateWorkingcopyArgsSchema>;

export const updateWorkingcopy = async ({
  path,
  config,
}: UpdateWorkingcopyArgs): Promise<undefined> => {
  const validatedArgs = updateWorkingcopyArgsSchema.parse({
    path,
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  const checkInWorkingcopyPath = `/${validatedArgs.path}/@workingcopy`;

  return apiRequest('patch', checkInWorkingcopyPath, options);
};

export const updateWorkingcopyMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'workingcopy'],
  mutationFn: ({ path }: Omit<UpdateWorkingcopyArgs, 'config'>) =>
    updateWorkingcopy({ path, config }),
});
