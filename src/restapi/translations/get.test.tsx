import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { linkTranslation } from './link';
import { installAddon } from '../addons/install';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getTranslationQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Translations', () => {
  test.skip('Hook - Successful', async () => {
    await installAddon({
      addonId: '/plone.app.multilingual',
      config: cli.config,
    });
    // We need to install 'plone.app.multilingual' in order to use translations endpoint

    const path = '/es/';
    const contentData = {
      '@type': 'Document',
      title: 'get-translation-es',
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
      () => useQuery(getTranslationQuery({ path: linkPath })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      `http://localhost:55001/plone${linkPath}/@translations`,
    );
  });

  test.skip('Hook - Failure', async () => {
    await installAddon({
      addonId: '/plone.app.multilingual',
      config: cli.config,
    });
    // We need to install 'plone.app.multilingual' in order to use translations endpoint

    const path = '/en/blah';
    const { result } = renderHook(
      () => useQuery(getTranslationQuery({ path })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
