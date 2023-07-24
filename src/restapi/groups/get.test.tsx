import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, getGroupQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Groups', () => {
  test('Hook - Successful', async () => {
    const path = '/Administrators';
    const { result } = renderHook(() => useQuery(getGroupQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.id).toBe('Administrators');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(() => useQuery(getGroupQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
