import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, getAddonsQuery } = cli;

beforeAll(async () => {
  await login({ username: 'admin', password: 'secret' });
});

describe('[GET] Addons', () => {
  test('Hook - Successful', async () => {
    const path = '/plone.app.iterate';
    const { result } = renderHook(() => useQuery(getAddonsQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/@addons/plone.app.iterate',
    );
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(() => useQuery(getAddonsQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.data).toBeUndefined());
  });
});
