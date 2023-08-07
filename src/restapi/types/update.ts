import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import { updateTypeDataSchema } from '../../interfaces/types';

export const updateTypeArgsSchema = z.object({
  contentPath: z.string(),
  data: updateTypeDataSchema,
  config: PloneClientConfigSchema,
});

export type UpdateTypeArgs = z.infer<typeof updateTypeArgsSchema>;

export const updateType = async ({
  contentPath,
  data,
  config,
}: UpdateTypeArgs): Promise<undefined> => {
  const validatedArgs = updateTypeArgsSchema.parse({
    contentPath,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const updateTypePath = `/@types/${validatedArgs.contentPath}`;

  return apiRequest('patch', updateTypePath, options);
};

export const updateTypeMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['patch', 'types'],
  mutationFn: ({ contentPath, data }: Omit<UpdateTypeArgs, 'config'>) =>
    updateType({ contentPath, data, config }),
});
