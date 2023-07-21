import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { createContent } from './add';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, deleteContentMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    await createContent({ path, data, config: cli.config });

    const pagePath = '/my-page';

    const { result } = renderHook(() => useMutation(deleteContentMutation()), {
      wrapper: createWrapper(),
    });

    await act(() => result.current.mutateAsync({ path: pagePath }));

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const path = '/blah';

    const { result } = renderHook(() => useMutation(deleteContentMutation()), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({ path });
      } catch (error) {
        // We expect an error, so do nothing
      }
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBeDefined();

    // @ts-ignore
    expect(result.current.error?.response?.status).toBe(404);
  });
});
