import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { getBreadcrumbsQuery } = cli;

describe('[GET] Breadcrumbs', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const { result } = renderHook(
      () => useQuery(getBreadcrumbsQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/@breadcrumbs',
    );
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(
      () => useQuery(getBreadcrumbsQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
