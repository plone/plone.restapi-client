import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';
import type { MutateContentArgs } from './add';

export const updateContent = async ({
  path,
  data,
  config,
}: MutateContentArgs & { data: Content }): Promise<Content> => {
  const options: ApiRequestParams = {
    data,
    config,
  };
  return handleRequest('patch', path, options);
};

export const updateContentQuery = ({ path, config }: MutateContentArgs) => ({
  mutationKey: [path, 'patch', 'content'],
  mutationFn: async (data: Content) => updateContent({ path, data, config }),
});
