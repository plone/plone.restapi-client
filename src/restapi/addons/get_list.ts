import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetAddonsListResponse } from '../../interfaces/addons';

export type AddonsListArgs = {
  config: PloneClientConfig;
};

export const getAddonsList = async ({
  config,
}: AddonsListArgs): Promise<GetAddonsListResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return handleRequest('get', '/@addons', options);
};

export const getAddonsListQuery = ({ config }: AddonsListArgs) => ({
  queryKey: ['get', 'addons'],
  queryFn: () => getAddonsList({ config }),
});
