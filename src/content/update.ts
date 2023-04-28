import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';
import type { MutateContentArgs } from './add';
import { PloneClientConfig } from '../client';

export const updateContent = async ({
  path,
  data,
  config,
}: MutateContentArgs & { config: PloneClientConfig }): Promise<Content> => {
  const options: ApiRequestParams = {
    data,
    config,
  };
  return handleRequest('patch', path, options);
};

export const updateContentQuery = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'content'],
  mutationFn: async ({ path, data }: MutateContentArgs) =>
    updateContent({ path, data, config }),
});
