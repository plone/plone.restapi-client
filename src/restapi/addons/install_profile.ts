import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';

const installAddonsProfileSchema = z.object({
  path: z.string(),
});

export type InstallAddonsProfileArgs = z.infer<
  typeof installAddonsProfileSchema
> & {
  config: PloneClientConfig;
};

export const installAddonsProfile = async ({
  path,
  config,
}: InstallAddonsProfileArgs): Promise<undefined> => {
  const validatedArgs = installAddonsProfileSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const installAddonsProfilePath = `@addons/${validatedArgs.path}/import/testing-workflows`;

  return apiRequest('post', installAddonsProfilePath, options);
};

export const installAddonsProfileMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'addons'],
  mutationFn: ({ path }: Omit<InstallAddonsProfileArgs, 'config'>) =>
    installAddonsProfile({ path, config }),
});
