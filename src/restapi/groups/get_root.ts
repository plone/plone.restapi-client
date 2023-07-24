import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetGroupRootResponse } from '../../interfaces/groups';

export type GroupsRootArgs = {
  config: PloneClientConfig;
};

export const getGroupsRoot = async ({
  config,
}: GroupsRootArgs): Promise<GetGroupRootResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@groups', options);
};

export const getGroupsRootQuery = ({ config }: GroupsRootArgs) => ({
  queryKey: ['get', 'groups'],
  queryFn: () => getGroupsRoot({ config }),
});
