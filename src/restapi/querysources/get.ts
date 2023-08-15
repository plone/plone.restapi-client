import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetQuerysourcesResponse } from '../../interfaces/querysources';

const getQuerysourcesSchema = z.object({
  path: z.string(),
  field: z.string(),
  query: z.string(),
});

export type QuerysourcesArgs = z.infer<typeof getQuerysourcesSchema> & {
  config: PloneClientConfig;
};

export const getQuerysources = async ({
  path,
  field,
  query,
  config,
}: QuerysourcesArgs): Promise<GetQuerysourcesResponse> => {
  const validatedArgs = getQuerysourcesSchema.parse({
    path,
    field,
    query,
  });

  const options: ApiRequestParams = {
    config,
    params: {
      ...(validatedArgs.query && { query: validatedArgs.query }),
    },
  };

  const querysourcesPath = `/${validatedArgs.path}/@querysoruces/${field}`;

  return apiRequest('get', querysourcesPath, options);
};

export const getQuerysourcesQuery = ({
  path,
  field,
  query,
  config,
}: QuerysourcesArgs) => ({
  queryKey: [path, field, query, 'get', 'querysources'],
  queryFn: () => getQuerysources({ path, field, query, config }),
});
