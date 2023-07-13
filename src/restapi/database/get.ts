import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { DatabaseResponse } from '../../interfaces/database';

export type DatabaseRootArgs = {
  config: PloneClientConfig;
};

export const getDatabaseRoot = async ({
  config,
}: DatabaseRootArgs): Promise<DatabaseResponse> => {
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
