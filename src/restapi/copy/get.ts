import { handleRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetCopyResponse } from '../../interfaces/copy';

import { z } from 'zod';

const getCopySchema = z.object({
  path: z.string(),
});

export type CopyArgs = z.infer<typeof getCopySchema> & {
  config: PloneClientConfig;
};

export const getCopy = async ({
  path,
  config,
}: CopyArgs): Promise<GetCopyResponse> => {
  const validatedArgs = getCopySchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const copyPath = `@copy/${validatedArgs.path}`;

  return handleRequest('get', copyPath, options);
};

export const getCopyQuery = ({ path, config }: CopyArgs) => ({
  queryKey: [path, 'get', 'copy'],
  queryFn: () => getCopy({ path, config }),
});
