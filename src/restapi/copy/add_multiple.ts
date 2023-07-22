import { z } from 'zod';
import { ApiRequestParams, handleRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  copyMultipleDataSchema,
  createCopyMultipleResponse,
} from '../../interfaces/copy';

export const createCopyMultipleArgsSchema = z.object({
  data: copyMultipleDataSchema,
  config: PloneClientConfigSchema,
});

export type CreateCopyMultipleArgs = z.infer<
  typeof createCopyMultipleArgsSchema
>;

export const createCopyMultiple = async ({
  data,
  config,
}: CreateCopyMultipleArgs): Promise<createCopyMultipleResponse> => {
  const validatedArgs = createCopyMultipleArgsSchema.parse({
    data,
    config,
  });

  const copyMultiplePath = `/@copy`;

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };
  return handleRequest('post', copyMultiplePath, options);
};

export const createCopyMultipleMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'copy'],
  mutationFn: ({ data }: Omit<CreateCopyMultipleArgs, 'config'>) =>
    createCopyMultiple({ data, config }),
});
