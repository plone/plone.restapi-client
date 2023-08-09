import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { z } from 'zod';
import { GetSearchResponse } from '../../interfaces/search';

export const getSearchSchema = z.object({
  SearchableText: z.string().optional(),
  metadata_fields: z.string().optional(),
  numeric_field: z.number().optional(),
  fullobjects: z.boolean().optional(),
});

export type SearchArgs = z.infer<typeof getSearchSchema> & {
  config: PloneClientConfig;
};

export const getSearch = async ({
  SearchableText,
  metadata_fields,
  numeric_field,
  fullobjects,
  config,
}: SearchArgs): Promise<GetSearchResponse> => {
  const validatedArgs = getSearchSchema.parse({
    SearchableText,
    metadata_fields,
    numeric_field,
    fullobjects,
  });

  // const queryObject = { query: validatedArgs.query };
  // const querystring = JSON.stringify(queryObject);
  // const encodedQuery = encodeURIComponent(querystring);

  const options: ApiRequestParams = {
    config,
    params: {
      ...(validatedArgs.SearchableText && {
        SearchableText: validatedArgs.SearchableText,
      }),
      ...(validatedArgs.metadata_fields && {
        metadata_fields: validatedArgs.metadata_fields,
      }),
      ...(validatedArgs.numeric_field && {
        numeric_field: validatedArgs.numeric_field,
      }),
      ...(validatedArgs.fullobjects && {
        fullobjects: validatedArgs.fullobjects,
      }),
    },
  };

  return apiRequest('get', '/@search', options);
};

export const getSearchQuery = ({
  SearchableText,
  metadata_fields,
  numeric_field,
  fullobjects,
  config,
}: SearchArgs) => ({
  queryKey: [
    SearchableText,
    metadata_fields,
    numeric_field,
    fullobjects,
    ,
    'get',
    'search',
  ],
  queryFn: () =>
    getSearch({
      SearchableText,
      metadata_fields,
      numeric_field,
      fullobjects,
      config,
    }),
});
