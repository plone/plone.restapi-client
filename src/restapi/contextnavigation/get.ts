import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { ContextNavigationResponse } from '../../interfaces/contextnavigation';
import { z } from 'zod';

const getContextNavigationSchema = z.object({
  path: z.string(),
});

export type ContextNavigationArgs = z.infer<
  typeof getContextNavigationSchema
> & {
  config: PloneClientConfig;
};

export const getContextNavigation = async ({
  path,
  config,
}: ContextNavigationArgs): Promise<ContextNavigationResponse> => {
  const validatedArgs = getContextNavigationSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };

  const contextnavigationPath = `${validatedArgs.path}/@contextnavigation`;

  return handleRequest('get', contextnavigationPath, options);
};

export const getContextNavigationQuery = ({
  path,
  config,
}: ContextNavigationArgs) => ({
  queryKey: [path, 'get', 'content'],
  queryFn: () => getContextNavigation({ path, config }),
});
