import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createContent } from '../content/add';
import { installAddon } from '../addons/install';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, linkTranslationMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Content', () => {
  test.skip('Hook - Successful', async () => {
    await installAddon({
      addonId: '/plone.app.multilingual',
      config: cli.config,
    });
    // We need to install 'plone.app.multilingual' in order to use translations endpoint

    const path = '/es/';
    const contentData = {
      '@type': 'Document',
      title: 'link-translation-es',
    };

    await createContent({ path, data: contentData, config: cli.config });

    const { result } = renderHook(
      () => useMutation(linkTranslationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const linkData = {
      id: `/es/${contentData.title}`,
    };
    const linkPath = `/en/${contentData.title}`;

    act(() => {
      result.current.mutate({ path: linkPath, data: linkData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test.skip('Hook - Failure', async () => {
    await installAddon({
      addonId: '/plone.app.multilingual',
      config: cli.config,
    });
    // We need to install 'plone.app.multilingual' in order to use translations endpoint

    const linkData = {
      id: '/es/blah',
    };

    const { result } = renderHook(
      () => useMutation(linkTranslationMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ path: '/en/blah', data: linkData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
