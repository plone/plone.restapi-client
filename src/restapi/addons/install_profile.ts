import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const getAddonsInstallProfileSchema = z.object({
  path: z.string(),
});

export type AddonsInstallProfileArgs = z.infer<
  typeof getAddonsInstallProfileSchema
> & {
  config: PloneClientConfig;
};

export const getAddonsInstallProfile = async ({
  path,
  config,
}: AddonsInstallProfileArgs): Promise<undefined> => {
  const validatedArgs = getAddonsInstallProfileSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonsInstallProfilePath = `$@addons/${validatedArgs.path}/import/testing-workflows`;

  return handleRequest('get', addonsInstallProfilePath, options);
};

export const getAddonsInstallProfileQuery = ({
  path,
  config,
}: AddonsInstallProfileArgs) => ({
  queryKey: [path, 'get', 'addonsInstallProfile'],
  queryFn: () => getAddonsInstallProfile({ path, config }),
});
