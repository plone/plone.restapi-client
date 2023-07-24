import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetGroupResponse } from '../../interfaces/groups';

const getGroupSchema = z.object({
  path: z.string(),
});

export type GroupArgs = z.infer<typeof getGroupSchema> & {
  config: PloneClientConfig;
};

export const getGroup = async ({
  path,
  config,
}: GroupArgs): Promise<GetGroupResponse> => {
  const validatedArgs = getGroupSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const groupPath = `@groups/${validatedArgs.path}`;

  return apiRequest('get', groupPath, options);
};

export const getGroupQuery = ({ path, config }: GroupArgs) => ({
  queryKey: [path, 'get', 'groups'],
  queryFn: () => getGroup({ path, config }),
});
