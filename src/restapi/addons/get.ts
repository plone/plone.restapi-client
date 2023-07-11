import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetAddonsResponse } from '../../interfaces/addons';
import { z } from 'zod';

const getAddonsSchema = z.object({
  path: z.string(),
});

export type AddonsArgs = z.infer<typeof getAddonsSchema> & {
  config: PloneClientConfig;
};

export const getAddons = async ({
  path,
  config,
}: AddonsArgs): Promise<GetAddonsResponse> => {
  const validatedArgs = getAddonsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonsPath = `@addons/${validatedArgs.path}`;

  return handleRequest('get', addonsPath, options);
};

export const getAddonsQuery = ({ path, config }: AddonsArgs) => ({
  queryKey: [path, 'get', 'addons'],
  queryFn: () => getAddons({ path, config }),
});
