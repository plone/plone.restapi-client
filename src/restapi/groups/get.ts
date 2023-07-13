import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const getGroupsSchema = z.object({
  path: z.string(),
});

export type GroupsArgs = z.infer<typeof getGroupsSchema> & {
  config: PloneClientConfig;
};

export const getGroups = async ({
  path,
  config,
}: GroupsArgs): Promise<undefined> => {
  const validatedArgs = getGroupsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const groupsPath = `@groups/${validatedArgs.path}`;

  return handleRequest('get', groupsPath, options);
};

export const getGroupsQuery = ({ path, config }: GroupsArgs) => ({
  queryKey: [path, 'get', 'groups'],
  queryFn: () => getGroups({ path, config }),
});
