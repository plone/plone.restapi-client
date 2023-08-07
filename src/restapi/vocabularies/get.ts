import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetVocabulariesResponse } from '../../interfaces/vocabularies';
import { z } from 'zod';

const getVocabulariesSchema = z.object({
  path: z.string(),
});

export type VocabulariesArgs = z.infer<typeof getVocabulariesSchema> & {
  config: PloneClientConfig;
};

export const getVocabularies = async ({
  path,
  config,
}: VocabulariesArgs): Promise<GetVocabulariesResponse> => {
  const validatedArgs = getVocabulariesSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const vocabulariesPath = `@vocabularies/${validatedArgs.path}`;

  return apiRequest('get', vocabulariesPath, options);
};

export const getVocabulariesQuery = ({ path, config }: VocabulariesArgs) => ({
  queryKey: [path, 'get', 'vocabularies'],
  queryFn: () => getVocabularies({ path, config }),
});
