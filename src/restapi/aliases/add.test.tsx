import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { createContent } from '../content/add';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createAliasesMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Aliases', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'front-page',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const pagePath = 'front-page/';

    const { result } = renderHook(() => useMutation(createAliasesMutation()), {
      wrapper: createWrapper(),
    });

    const aliasesData = {
      items: [
        {
          path: '/new-alias',
        },
      ],
    };

    act(() => {
      result.current.mutate({ path: pagePath, data: aliasesData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const aliasesData = {
      items: [
        {
          path: '/new-alias',
        },
      ],
    };

    const { result } = renderHook(() => useMutation(createAliasesMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data: aliasesData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
