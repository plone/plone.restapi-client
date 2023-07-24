import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { User as GetUserResponse } from '../../interfaces/users';

const getUserSchema = z.object({
  path: z.string(),
});

export type UserArgs = z.infer<typeof getUserSchema> & {
  config: PloneClientConfig;
};

export const getUser = async ({
  path,
  config,
}: UserArgs): Promise<GetUserResponse> => {
  const validatedArgs = getUserSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const userPath = `@users/${validatedArgs.path}`;

  return apiRequest('get', userPath, options);
};

export const getUserQuery = ({ path, config }: UserArgs) => ({
  queryKey: [path, 'get', 'users'],
  queryFn: () => getUser({ path, config }),
});
