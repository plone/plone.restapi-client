import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const installAddonSchema = z.object({
  addonId: z.string(),
});

export type InstallAddonArgs = z.infer<typeof installAddonSchema> & {
  config: PloneClientConfig;
};

export const installAddon = async ({
  addonId,
  config,
}: InstallAddonArgs): Promise<undefined> => {
  const validatedArgs = installAddonSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const installAddonPath = `@addons/${validatedArgs.addonId}/install`;

  return apiRequest('post', installAddonPath, options);
};

export const installAddonMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<InstallAddonArgs, 'config'>) =>
    installAddon({ addonId, config }),
});
