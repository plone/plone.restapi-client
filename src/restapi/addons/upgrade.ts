import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const getAddonsUpgradeSchema = z.object({
  path: z.string(),
});

export type AddonsUpgradeArgs = z.infer<typeof getAddonsUpgradeSchema> & {
  config: PloneClientConfig;
};

export const getAddonsUpgrade = async ({
  path,
  config,
}: AddonsUpgradeArgs): Promise<undefined> => {
  const validatedArgs = getAddonsUpgradeSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonsUpgradePath = `@addons/${validatedArgs.path}/upgrade`;

  return handleRequest('post', addonsUpgradePath, options);
};

export const getAddonsUpgradeQuery = ({ path, config }: AddonsUpgradeArgs) => ({
  queryKey: [path, 'post', 'addonsUpgrade'],
  queryFn: () => getAddonsUpgrade({ path, config }),
});
