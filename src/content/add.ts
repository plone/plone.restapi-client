import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';
import { PloneClientConfig } from '../client';

export type MutateContentArgs = {
  path: string;
  data: Content;
};

export const createContent = async ({
  path,
  data,
  config,
}: MutateContentArgs & { config: PloneClientConfig }): Promise<Content> => {
  const options: ApiRequestParams = {
    data,
    config,
  };
  return handleRequest('post', path, options);
};

export const createContentQuery = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'content'],
  mutationFn: async ({ path, data }: MutateContentArgs) =>
    createContent({ path, data, config }),
});
