import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  copyMoveDataSchema as moveContentDataSchema,
  CopyMoveResponse as MoveContentResponse,
} from '../../interfaces/copymove';

export const MoveContentArgsSchema = z.object({
  path: z.string(),
  data: moveContentDataSchema,
  config: PloneClientConfigSchema,
});

export type MoveContentArgs = z.infer<typeof MoveContentArgsSchema>;

export const moveContent = async ({
  path,
  data,
  config,
}: MoveContentArgs): Promise<MoveContentResponse> => {
  const validatedArgs = MoveContentArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const moveContentPath = `/${validatedArgs.path}/@move`;

  return apiRequest('post', moveContentPath, options);
};

export const moveContentMutation = ({
  config,
}: {
  config: PloneClientConfig;
}) => ({
  mutationKey: ['post', 'moveContent'],
  mutationFn: ({ path, data }: Omit<MoveContentArgs, 'config'>) =>
    moveContent({ path, data, config }),
});
