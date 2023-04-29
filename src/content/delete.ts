import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';
import { PloneClientConfig } from '../client';

export type MutateNoDataContentArgs = {
  path: string;
};

export const deleteContent = async ({
  path,
  config,
}: MutateNoDataContentArgs & {
  config: PloneClientConfig;
}): Promise<Content> => {
  const options: ApiRequestParams = {
    config,
  };
  return handleRequest('delete', path, options);
};

export const deleteContentQuery = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['delete', 'content'],
  mutationFn: async ({ path }: { path: string }) =>
    deleteContent({ path, config }),
});
