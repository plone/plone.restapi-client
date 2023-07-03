import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import { PloneClientConfig, PloneClientConfigSchema } from '../../client';
import { AddContentResponse } from '../../interfaces/content/add';

export const createContentDataSchema = z.object({
  '@id': z.string().optional(),
  '@type': z.string().optional(),
  title: z.string(),
});

export const createContentArgsSchema = z.object({
  path: z.string(),
  data: createContentDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateContentArgs = z.infer<typeof createContentArgsSchema>;

export const createContent = async ({
  path,
  data,
  config,
}: CreateContentArgs): Promise<AddContentResponse> => {
  const validatedArgs = createContentArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };
  return handleRequest('post', validatedArgs.path, options);
};

export const createContentQuery = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'content'],
  mutationFn: ({ path, data }: Omit<CreateContentArgs, 'config'>) =>
    createContent({ path, data, config }),
});
