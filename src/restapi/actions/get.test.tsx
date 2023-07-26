import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { getActionsQuery } = cli;

describe('[GET] Actions', () => {
  test('Hook - Successful', async () => {
    const actionId = '/';
    const { result } = renderHook(
      () => useQuery(getActionsQuery({ actionId })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).not.toBeUndefined();
    expect(result.current.data).toHaveProperty('user');
    expect(result.current.data).toHaveProperty('portal_tabs');
    expect(result.current.data).toHaveProperty('site_actions');
  });

  test('Hook - Failure', async () => {
    const actionId = 'blah';
    const { result } = renderHook(
      () => useQuery(getActionsQuery({ actionId })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
