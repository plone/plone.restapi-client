import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetSourcesResponse } from '../../interfaces/sources';

const getSourcesSchema = z.object({
  path: z.string(),
  field: z.string(),
});

export type SourcesArgs = z.infer<typeof getSourcesSchema> & {
  config: PloneClientConfig;
};

export const getSources = async ({
  path,
  field,
  config,
}: SourcesArgs): Promise<GetSourcesResponse> => {
  const validatedArgs = getSourcesSchema.parse({
    path,
    field,
  });

  const options: ApiRequestParams = {
    config,
  };

  const sourcesPath = `/${validatedArgs.path}/@sources/${field}`;

  return apiRequest('get', sourcesPath, options);
};

export const getSourcesQuery = ({ path, field, config }: SourcesArgs) => ({
  queryKey: [path, field, 'get', 'sources'],
  queryFn: () => getSources({ path, field, config }),
});
