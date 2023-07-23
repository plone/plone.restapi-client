import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetAliasesRootResponse } from '../../interfaces/aliases';

export type AliasesRootArgs = {
  config: PloneClientConfig;
};

export const getAliasesRoot = async ({
  config,
}: AliasesRootArgs): Promise<GetAliasesRootResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return handleRequest('get', '/@aliases', options);
};

export const getAliasesRootQuery = ({ config }: AliasesRootArgs) => ({
  queryKey: ['get', 'aliases'],
  queryFn: () => getAliasesRoot({ config }),
});
