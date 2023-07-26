import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetAddonsResponse } from '../../interfaces/addons';
import { z } from 'zod';

const getAddonsSchema = z.object({
  addonId: z.string(),
});

export type AddonsArgs = z.infer<typeof getAddonsSchema> & {
  config: PloneClientConfig;
};

export const getAddons = async ({
  addonId,
  config,
}: AddonsArgs): Promise<GetAddonsResponse> => {
  const validatedArgs = getAddonsSchema.parse({
    addonId,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const addonsAddonId = `@addons/${validatedArgs.addonId}`;

  return apiRequest('get', addonsAddonId, options);
};

export const getAddonsQuery = ({ addonId, config }: AddonsArgs) => ({
  queryKey: [addonId, 'get', 'addons'],
  queryFn: () => getAddons({ addonId, config }),
});
