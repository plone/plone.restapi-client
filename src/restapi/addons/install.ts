import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const getAddonsInstallSchema = z.object({
  path: z.string(),
});

export type AddonsInstallArgs = z.infer<typeof getAddonsInstallSchema> & {
  config: PloneClientConfig;
};

export const getAddonsInstall = async ({
  path,
  config,
}: AddonsInstallArgs): Promise<undefined> => {
  const validatedArgs = getAddonsInstallSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonsInstallPath = `@addons/${validatedArgs.path}/install`;

  return handleRequest('get', addonsInstallPath, options);
};

export const getAddonsInstallQuery = ({ path, config }: AddonsInstallArgs) => ({
  queryKey: [path, 'get', 'addonsInstall'],
  queryFn: () => getAddonsInstall({ path, config }),
});
