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
    const path = '/';
    const { result } = renderHook(() => useQuery(getActionsQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.user[0]['id']).toBe('login');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(() => useQuery(getActionsQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
