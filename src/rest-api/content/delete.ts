import { handleRequest, ApiRequestParams } from '../../API';
import { z } from 'zod';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { UpdateContentArgs } from './update';

export const deleteContentArgsSchema = z.object({
  path: z.string(),
  config: PloneClientConfigSchema,
});

type DeleteContentArgs = z.infer<typeof deleteContentArgsSchema>;

export const deleteContent = async ({
  path,
  config,
}: DeleteContentArgs): Promise<UpdateContentArgs> => {
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
  mutationFn: ({ path }: Omit<DeleteContentArgs, 'config'>) =>
    deleteContent({ path, config }),
});
