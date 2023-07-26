import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { ActionsResponse } from '../../interfaces/actions';
import { z } from 'zod';

const getActionsSchema = z.object({
  actionId: z.string(),
});

export type ActionsArgs = z.infer<typeof getActionsSchema> & {
  config: PloneClientConfig;
};

export const getActions = async ({
  actionId,
  config,
}: ActionsArgs): Promise<ActionsResponse> => {
  const validatedArgs = getActionsSchema.parse({
    actionId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const actionsActionId = `${validatedArgs.actionId}/@actions`;

  return apiRequest('get', actionsActionId, options);
};

export const getActionsQuery = ({ actionId, config }: ActionsArgs) => ({
  queryKey: [actionId, 'get', 'actions'],
  queryFn: () => getActions({ actionId, config }),
});
