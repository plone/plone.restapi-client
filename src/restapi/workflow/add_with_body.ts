import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  createWorkflowWithBodyDataSchema,
  CreateWorkflowResponse as CreateWorkflowWithBodyResponse,
} from '../../interfaces/workflow';

export const createWorkflowWithBodyArgsSchema = z.object({
  data: createWorkflowWithBodyDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateWorkflowWithBodyArgs = z.infer<
  typeof createWorkflowWithBodyArgsSchema
>;

export const createWorkflowWithBody = async ({
  data,
  config,
}: CreateWorkflowWithBodyArgs): Promise<CreateWorkflowWithBodyResponse> => {
  const validatedArgs = createWorkflowWithBodyArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@workflow/publish', options);
};

export const createWorkflowWithBodyMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'workflow'],
  mutationFn: ({ data }: Omit<CreateWorkflowWithBodyArgs, 'config'>) =>
    createWorkflowWithBody({ data, config }),
});
