import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createContent } from '../content/add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getSearchQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] Search', () => {
  test('Hook - Successful', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `page1${randomId}`,
      description: 'some-unique-data',
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const searchQuery = contentData.description;

    const { result } = renderHook(
      () => useQuery(getSearchQuery({ SearchableText: searchQuery })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.items[0].description).toBe(
      contentData.description,
    );
    console.log(result.current.data);
  });

  test('Hook - Successful - metadata', async () => {
    const randomId = uuid();
    const contentData = {
      '@type': 'Document',
      title: `page1${randomId}`,
      description: 'some-unique-data',
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const searchText = contentData.description;
    const metadataFields = 'created';

    const { result } = renderHook(
      () =>
        useQuery(
          getSearchQuery({
            SearchableText: searchText,
            metadata_fields: metadataFields,
          }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.items[0]).toHaveProperty('created');
  });
});
