import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';

export type DatabaseRootArgs = {
  config: PloneClientConfig;
};

export const getDatabaseRoot = async ({
  config,
}: DatabaseRootArgs): Promise<undefined> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return handleRequest('get', '/@database', options);
};

export const getDatabaseRootQuery = ({ config }: DatabaseRootArgs) => ({
  queryKey: ['get', 'database'],
  queryFn: () => getDatabaseRoot({ config }),
});
