import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetUsersRootResponse } from '../../interfaces/users';

export type UsersRootArgs = {
  config: PloneClientConfig;
};

export const getUsersRoot = async ({
  config,
}: UsersRootArgs): Promise<GetUsersRootResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return handleRequest('get', '/@users', options);
};

export const getUsersRootQuery = ({ config }: UsersRootArgs) => ({
  queryKey: ['get', 'users'],
  queryFn: () => getUsersRoot({ config }),
});
