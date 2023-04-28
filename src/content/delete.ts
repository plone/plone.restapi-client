import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';
import type { MutateContentArgs } from './add';

export const deleteContent = async ({
  path,
  config,
}: MutateContentArgs): Promise<Content> => {
  const options: ApiRequestParams = {
    config,
  };
  return handleRequest('delete', path, options);
};

export const deleteContentQuery = ({ config }: MutateContentArgs) => ({
  mutationKey: ['delete', 'content'],
  mutationFn: async ({ path }: { path: string }) =>
    deleteContent({ path, config }),
});
