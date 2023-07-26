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

const { login, createAliasesRootMutation } = cli;

await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] AliasesRoot', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'Sample page',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(
      () => useMutation(createAliasesRootMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const aliasesData = {
      items: [
        {
          datetime: '2022-10-07',
          path: '/new-alias',
          'redirect-to': '/sample-page',
        },
      ],
    };

    act(() => {
      result.current.mutate({ data: aliasesData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const aliasesData = {
      items: [
        {
          datetime: '2023-10-07',
          path: '/new-alias',
          'redirect-to': '/alias-page',
        },
      ],
    };

    const { result } = renderHook(
      () => useMutation(createAliasesRootMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ data: aliasesData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
