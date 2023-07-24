import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const upgradeAddonsSchema = z.object({
  path: z.string(),
});

export type UpgradeAddonsArgs = z.infer<typeof upgradeAddonsSchema> & {
  config: PloneClientConfig;
};

export const upgradeAddons = async ({
  path,
  config,
}: UpgradeAddonsArgs): Promise<undefined> => {
  const validatedArgs = upgradeAddonsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const upgradeAddonsPath = `@addons/${validatedArgs.path}/upgrade`;

  return apiRequest('post', upgradeAddonsPath, options);
};

export const upgradeAddonsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ path }: Omit<UpgradeAddonsArgs, 'config'>) =>
    upgradeAddons({ path, config }),
});
