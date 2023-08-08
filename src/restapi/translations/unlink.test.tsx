import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createContent } from '../content/add';
import { linkTranslation } from './link';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, unlinkTranslationMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Content', () => {
  test.skip('Hook - Successful', async () => {
    const path = '/es/';
    const contentData = {
      '@type': 'Document',
      title: 'unlink-translation-es',
    };

    await createContent({ path, data: contentData, config: cli.config });

    const linkData = {
      id: `/es/${contentData.title}`,
    };
    const linkPath = `/en/${contentData.title}`;

    await linkTranslation({
      path: linkPath,
      data: linkData,
      config: cli.config,
    });

    const { result } = renderHook(
      () => useMutation(unlinkTranslationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const unlinkData = {
      language: 'es',
    };

    act(() => {
      result.current.mutate({ path: linkPath, data: unlinkData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test.skip('Hook - Failure', async () => {
    const { result } = renderHook(
      () => useMutation(unlinkTranslationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const unlinkData = {
      language: 'es',
    };

    act(() => {
      result.current.mutate({ path: '/en/blah', data: unlinkData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
