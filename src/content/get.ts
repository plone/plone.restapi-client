import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';
import { PloneClientConfig } from '../client';

export type ContentArgs = {
  path: string;
  version?: string;
  page?: number;
  fullObjects?: boolean;
  config: PloneClientConfig;
};

export const getContent = async ({
  path,
  version,
  page,
  fullObjects,
  config,
}: ContentArgs): Promise<Content> => {
  const options: ApiRequestParams = {
    config,
    params: {
      ...(version && { version }),
      ...(fullObjects && { fullobjects: fullObjects }),
    },
  };
  if (version) {
    return handleRequest('get', `${path}/@history/${version}`, options);
  }
  return handleRequest('get', path, options);
};

export const getContentQuery = ({
  path,
  version,
  page,
  fullObjects,
  config,
}: ContentArgs) => ({
  queryKey: [path, 'get', 'content'],
  queryFn: async () => getContent({ path, version, page, fullObjects, config }),
});
