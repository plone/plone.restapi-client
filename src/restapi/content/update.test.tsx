import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { createContent } from './add';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { getContent } from './get';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateContentMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    await createContent({ path, data, config: cli.config });

    const dataPatch = {
      title: 'My Page updated',
    };
    const pagePath = '/my-page';

    const { result } = renderHook(() => useMutation(updateContentMutation()), {
      wrapper: createWrapper(),
    });

    await act(() =>
      result.current.mutateAsync({ path: pagePath, data: dataPatch }),
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const page = await getContent({ path: pagePath, config: cli.config });

    expect(page?.['@id']).toBe('http://localhost:55001/plone/my-page');
    expect(page?.title).toBe('My Page updated');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };
    const { result } = renderHook(() => useMutation(updateContentMutation()), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      try {
        await result.current.mutateAsync({ path, data });
      } catch (error) {
        // We expect an error, so do nothing
      }
    });

    expect(result.current.status).toBe('error');
    expect(result.current.error).toBeDefined();
  });
});
