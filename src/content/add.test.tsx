import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../client';
import { Content } from '../interfaces/content';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createContentQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const data: Content = {
      '@type': 'Document',
      title: 'My Page',
    };

    const { result } = renderHook(
      () => useMutation(createContentQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ ...data });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // console.dir(result.current.error, { depth: null });
    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/my-page',
    );
    expect(result.current.data?.title).toBe('My Page');
  });

  test('Hook - Successful - setup/tearingDown setup', async () => {
    const path = '/';
    const data: Content = {
      '@type': 'Document',
      title: 'My Page',
    };

    const { result } = renderHook(
      () => useMutation(createContentQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ ...data });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // console.dir(result.current.data['@id'], { depth: null });
    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/my-page',
    );
    expect(result.current.data?.title).toBe('My Page');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const data: Content = {
      '@type': 'Document',
      title: 'My Page',
    };
    const { result } = renderHook(
      () => useMutation(createContentQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ ...data });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // console.dir(result.current.error, { depth: null });
    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
