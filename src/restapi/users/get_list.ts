import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetUsersResponse } from '../../interfaces/users';

export type GetUsersArgs = {
  config: PloneClientConfig;
};

export const getUsers = async ({
  config,
}: GetUsersArgs): Promise<GetUsersResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@users', options);
};

export const getUsersQuery = ({ config }: GetUsersArgs) => ({
  queryKey: ['get', 'users'],
  queryFn: () => getUsers({ config }),
});
