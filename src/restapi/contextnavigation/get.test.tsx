import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { getContextNavigationQuery } = cli;

describe('[GET] ContextNavigation', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const { result } = renderHook(
      () => useQuery(getContextNavigationQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/@contextnavigation',
    );
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(
      () => useQuery(getContextNavigationQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
    // @ts-expect-error TODO: find a way to set the error type properly for error
    expect(result.current.error.response?.status).toBe(404);
  });
});
