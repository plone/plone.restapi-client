import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, getAddonsListQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] AddonsList', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useQuery(getAddonsListQuery({})), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
