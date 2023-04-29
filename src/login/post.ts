import { Login } from '../interfaces/login';
import { handleRequest, ApiRequestParams } from '../API';
import { PloneClientConfig } from '../client';

export type LoginArgs = {
  username: string;
  password: string;
  config: PloneClientConfig;
};

export const login = async ({
  username,
  password,
  config,
}: LoginArgs): Promise<Login> => {
  const options: ApiRequestParams = {
    data: { login: username, password },
    config,
  };
  return handleRequest('post', '/@login', options);
};

export const loginQuery = ({ username, password, config }: LoginArgs) => ({
  queryKey: [username, 'login'],
  queryFn: async () => login({ username, password, config }),
});
