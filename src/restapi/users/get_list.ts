import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetUsersResponse } from '../../interfaces/users';

const getUsersSchema = z.object({
  query: z.string().optional(),
  groupsFilter: z.array(z.string()).optional(),
  search: z.string().optional(),
});

export type GetUsersArgs = z.infer<typeof getUsersSchema> & {
  config: PloneClientConfig;
};

export const getUsers = async ({
  query,
  groupsFilter,
  search,
  config,
}: GetUsersArgs): Promise<GetUsersResponse> => {
  const validatedArgs = getUsersSchema.parse({
    query,
    groupsFilter,
    search,
  });

  const options: ApiRequestParams = {
    config,
    params: {
      ...(validatedArgs.query && { query: validatedArgs.query }),
      ...(validatedArgs.groupsFilter && {
        'groups-filter': validatedArgs.groupsFilter,
      }),
      ...(validatedArgs.search && { search: validatedArgs.search }),
    },
  };

  return apiRequest('get', '/@users', options);
};

export const getUsersQuery = ({
  query,
  groupsFilter,
  search,
  config,
}: GetUsersArgs) => ({
  queryKey: [query, groupsFilter, search, 'get', 'users'],
  queryFn: () => getUsers({ query, groupsFilter, search, config }),
});
