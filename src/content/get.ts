import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';
import { expandersToQueryString } from '../utils';

type Expander = {
  name: string;
  querystring: any;
};

type ContentArgs = {
  path: string;
  expanders: Expander[];
  version?: string;
  page?: number;
  fullObjects?: boolean;
};

type ContentQueryArgs = ContentArgs & {
  select?: () => any;
};

export const getContent = async ({
  path,
  expanders,
  version,
  page,
  fullObjects,
}: ContentArgs): Promise<Content> => {
  const [expand, expandQS] = expandersToQueryString(expanders);
  const options: ApiRequestParams = {
    params: {
      ...(version && { version }),
      ...(fullObjects && { fullobjects: fullObjects }),
      ...(expand && { expand }),
      ...(expandQS && { ...expandQS }),
    },
  };
  if (version) {
    return handleRequest('get', `${path}/@history/${version}`, options);
  }
  return handleRequest('get', path, options);
};

export const getContentQuery = ({
  path,
  select,
  expanders,
  version,
  page,
  fullObjects,
}: ContentQueryArgs) => ({
  queryKey: ['get', 'content', path],
  queryFn: async () =>
    getContent({ path, expanders, version, page, fullObjects }),
  select,
});
