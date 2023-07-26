import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const upgradeAddonsSchema = z.object({
  addonId: z.string(),
});

export type UpgradeAddonsArgs = z.infer<typeof upgradeAddonsSchema> & {
  config: PloneClientConfig;
};

export const upgradeAddons = async ({
  addonId,
  config,
}: UpgradeAddonsArgs): Promise<undefined> => {
  const validatedArgs = upgradeAddonsSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const upgradeAddonsAddonId = `@addons/${validatedArgs.addonId}/upgrade`;

  return apiRequest('post', upgradeAddonsAddonId, options);
};

export const upgradeAddonsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<UpgradeAddonsArgs, 'config'>) =>
    upgradeAddons({ addonId, config }),
});
