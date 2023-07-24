import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const installAddonsSchema = z.object({
  path: z.string(),
});

export type InstallAddonsArgs = z.infer<typeof installAddonsSchema> & {
  config: PloneClientConfig;
};

export const installAddons = async ({
  path,
  config,
}: InstallAddonsArgs): Promise<undefined> => {
  const validatedArgs = installAddonsSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const installAddonsPath = `@addons/${validatedArgs.path}/install`;

  return apiRequest('post', installAddonsPath, options);
};

export const installAddonsMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ path }: Omit<InstallAddonsArgs, 'config'>) =>
    installAddons({ path, config }),
});
