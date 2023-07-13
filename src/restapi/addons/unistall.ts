import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const getAddonsUninstallSchema = z.object({
  path: z.string(),
});

export type AddonsUninstallArgs = z.infer<typeof getAddonsUninstallSchema> & {
  config: PloneClientConfig;
};

export const getAddonsUninstall = async ({
  path,
  config,
}: AddonsUninstallArgs): Promise<undefined> => {
  const validatedArgs = getAddonsUninstallSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonsUninstallPath = `@addons/${validatedArgs.path}/uninstall`;

  return handleRequest('post', addonsUninstallPath, options);
};

export const getAddonsUninstallQuery = ({
  path,
  config,
}: AddonsUninstallArgs) => ({
  queryKey: [path, 'post', 'addonsUninstall'],
  queryFn: () => getAddonsUninstall({ path, config }),
});
