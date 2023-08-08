import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { linkTranslation } from './link';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getTranslationQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Translations', () => {
  test.skip('Hook - Successful', async () => {
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
