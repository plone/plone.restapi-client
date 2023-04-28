import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';
import { PloneClientConfig } from '../client';

export type MutateContentArgs = {
  path: string;
  config: PloneClientConfig;
};

export const createContent = async ({
  path,
  data,
  config,
}: MutateContentArgs & { data: Content }): Promise<Content> => {
  const options: ApiRequestParams = {
    data,
    config,
  };
  return handleRequest('post', path, options);
};

export const createContentQuery = ({
  path,
  config,
}: Omit<MutateContentArgs, 'data'>) => ({
  mutationKey: [path, 'post', 'content'],
  mutationFn: async (data: Content) => createContent({ path, data, config }),
});
