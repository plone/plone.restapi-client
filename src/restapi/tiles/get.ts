import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetTileResponse } from '../../interfaces/tiles';

const getTileSchema = z.object({
  tileId: z.string(),
});

export type GetTileArgs = z.infer<typeof getTileSchema> & {
  config: PloneClientConfig;
};

export const getTile = async ({
  tileId,
  config,
}: GetTileArgs): Promise<GetTileResponse> => {
  const validatedArgs = getTileSchema.parse({
    tileId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const getTilePath = `@tiles/${validatedArgs.tileId}`;

  return apiRequest('get', getTilePath, options);
};

export const getTileQuery = ({ tileId, config }: GetTileArgs) => ({
  queryKey: [tileId, 'get', 'tiles'],
  queryFn: () => getTile({ tileId, config }),
});
