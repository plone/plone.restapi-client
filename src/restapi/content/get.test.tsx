import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

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

    // @ts-ignore
    expect(result.current.error.status).toBe(404);
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
