import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const uninstallAddonsSchema = z.object({
  path: z.string(),
});

export type UninstallAddonsArgs = z.infer<typeof uninstallAddonsSchema> & {
  config: PloneClientConfig;
};

export const uninstallAddons = async ({
  path,
  config,
}: UninstallAddonsArgs): Promise<undefined> => {
  const validatedArgs = uninstallAddonsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const uninstallAddonsPath = `@addons/${validatedArgs.path}/uninstall`;

  return apiRequest('post', uninstallAddonsPath, options);
};

export const uninstallAddonsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ path }: Omit<UninstallAddonsArgs, 'config'>) =>
    uninstallAddons({ path, config }),
});
