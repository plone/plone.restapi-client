import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const uninstallAddonsSchema = z.object({
  addonId: z.string(),
});

export type UninstallAddonsArgs = z.infer<typeof uninstallAddonsSchema> & {
  config: PloneClientConfig;
};

export const uninstallAddons = async ({
  addonId,
  config,
}: UninstallAddonsArgs): Promise<undefined> => {
  const validatedArgs = uninstallAddonsSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const uninstallAddonsAddonId = `@addons/${validatedArgs.addonId}/uninstall`;

  return apiRequest('post', uninstallAddonsAddonId, options);
};

export const uninstallAddonsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<UninstallAddonsArgs, 'config'>) =>
    uninstallAddons({ addonId, config }),
});
