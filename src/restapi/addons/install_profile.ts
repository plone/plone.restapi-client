import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const installAddonProfileSchema = z.object({
  addonId: z.string(),
});

export type InstallAddonProfileArgs = z.infer<
  typeof installAddonProfileSchema
> & {
  config: PloneClientConfig;
};

export const installAddonProfile = async ({
  addonId,
  config,
}: InstallAddonProfileArgs): Promise<undefined> => {
  const validatedArgs = installAddonProfileSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const installAddonProfilePath = `@addons/${validatedArgs.addonId}/import/testing-workflows`;

  return apiRequest('post', installAddonProfilePath, options);
};

export const installAddonProfileMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<InstallAddonProfileArgs, 'config'>) =>
    installAddonProfile({ addonId, config }),
});
