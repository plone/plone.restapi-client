import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { apiRequest } from '../../API';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { getContentQuery } = cli;

describe('[GET] Content', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const { result } = renderHook(() => useQuery(getContentQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(() => useQuery(getContentQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });

  test('Hook - fullobjects', async () => {
    const path = '/';
    const fullObjects = true;
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path, fullObjects })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });

  test('Hook - expand', async () => {
    const path = '/';
    const fullObjects = true;
    const { result } = renderHook(
      () =>
        useQuery(
          getContentQuery({ path, expand: ['breadcrumbs', 'navigation'] }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
    expect(
      result.current.data?.['@components']?.breadcrumbs?.items,
    ).toStrictEqual([]);
    expect(result.current.data?.['@components']?.breadcrumbs?.root).toBe(
      'http://localhost:55001/plone',
    );
    expect(
      result.current.data?.['@components']?.navigation?.items?.length,
    ).toStrictEqual(3);
  });

  test.skip('Hook - version', async () => {
    const path = '/';
    const version = 'abcd';
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path, version })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });

  test.skip('Hook - fullObjects && version', async () => {
    const path = '/';
    const fullObjects = true;
    const version = 'abcd';
    const { result } = renderHook(
      () => useQuery(getContentQuery({ path, fullObjects, version })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  });
});

describe('apiRequest getContent', () => {
  test('GET - 200 - Use expanders', async () => {
    const path = '/';
    const response = await apiRequest('get', path, {
      config: { apiPath: 'http://localhost:55001/plone' },
      raw: true,
      params: {
        expand: ['breadcrumbs', 'navigation'],
      },
    });

    expect(response.status).toBe(200);
    expect(response.data['@components'].breadcrumbs.items).toStrictEqual([]);
    expect(response.data['@components'].breadcrumbs.root).toBe(
      'http://localhost:55001/plone',
    );
    expect(response.data['@components'].navigation.items.length).toStrictEqual(
      3,
    );
  });
});
