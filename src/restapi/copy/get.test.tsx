import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import ploneClient from '../../client';
import { createContent } from '../content/add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, createCopyMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Copy', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'frontpage',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const copyData = {
      source: 'http://localhost:55001/plone/asd',
    };

    const { result } = renderHook(() => useMutation(createCopyMutation({})), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: copyData });
    });

    console.log(result.current.data);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const { result } = renderHook(() => useMutation(createCopyMutation({})), {
      wrapper: createWrapper(),
    });

    const copyData = {
      source: 'http://localhost:55001/plone/blah',
    };

    act(() => {
      result.current.mutate({ data: copyData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
