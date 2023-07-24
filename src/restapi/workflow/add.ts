import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { CreateWorkflowResponse } from '../../interfaces/workflow';

export const createWorkflowArgsSchema = z.object({
  config: PloneClientConfigSchema,
});

export type CreateWorkflowArgs = z.infer<typeof createWorkflowArgsSchema>;

export const createWorkflow = async ({
  config,
}: CreateWorkflowArgs): Promise<CreateWorkflowResponse> => {
  const validatedArgs = createWorkflowArgsSchema.parse({
    config,
  });

  const options: ApiRequestParams = {
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@workflow/publish', options);
};

export const createWorkflowMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'workflow'],
  mutationFn: ({}: Omit<CreateWorkflowArgs, 'config'>) =>
    createWorkflow({ config }),
});
