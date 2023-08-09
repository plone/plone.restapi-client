import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetTilesResponse } from '../../interfaces/tiles';

export type GetTilesArgs = {
  config: PloneClientConfig;
};

export const getTiles = async ({
  config,
}: GetTilesArgs): Promise<GetTilesResponse> => {
  const options: ApiRequestParams = {
    config,
    params: {},
  };

  return apiRequest('get', '/@tiles', options);
};

export const getTilesQuery = ({ config }: GetTilesArgs) => ({
  queryKey: ['get', 'tiles'],
  queryFn: () => getTiles({ config }),
});
