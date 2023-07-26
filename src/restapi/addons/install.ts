import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const installAddonsSchema = z.object({
  addonId: z.string(),
});

export type InstallAddonsArgs = z.infer<typeof installAddonsSchema> & {
  config: PloneClientConfig;
};

export const installAddons = async ({
  addonId,
  config,
}: InstallAddonsArgs): Promise<undefined> => {
  const validatedArgs = installAddonsSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const installAddonsAddonId = `@addons/${validatedArgs.addonId}/install`;

  return apiRequest('post', installAddonsAddonId, options);
};

export const installAddonsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<InstallAddonsArgs, 'config'>) =>
    installAddons({ addonId, config }),
});
