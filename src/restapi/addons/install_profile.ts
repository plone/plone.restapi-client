import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const installAddonsProfileSchema = z.object({
  addonId: z.string(),
});

export type InstallAddonsProfileArgs = z.infer<
  typeof installAddonsProfileSchema
> & {
  config: PloneClientConfig;
};

export const installAddonsProfile = async ({
  addonId,
  config,
}: InstallAddonsProfileArgs): Promise<undefined> => {
  const validatedArgs = installAddonsProfileSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const installAddonsProfileAddonId = `@addons/${validatedArgs.addonId}/import/testing-workflows`;

  return apiRequest('post', installAddonsProfileAddonId, options);
};

export const installAddonsProfileMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ addonId }: Omit<InstallAddonsProfileArgs, 'config'>) =>
    installAddonsProfile({ addonId, config }),
});
