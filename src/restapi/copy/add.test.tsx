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

beforeAll(async () => {
  await login({ username: 'admin', password: 'secret' });
});

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
      source: 'http://localhost:55001/plone/frontpage',
    };

    const { result } = renderHook(() => useMutation(createCopyMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: copyData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.[0]['target']).toBe(
      'http://localhost:55001/plone/copy_of_frontpage',
    );
  });

  test('Hook - Failure', async () => {
    const { result } = renderHook(() => useMutation(createCopyMutation()), {
      wrapper: createWrapper(),
    });

    const copyData = {
      source: 'http://localhost:55001/plone/blah',
    };

    act(() => {
      result.current.mutate({ data: copyData });
    });

    // TODO: Find correct implementation for failure test as currently API does not return an error status code when it is supposed to raise error

    // await waitFor(() => expect(result.current.isError).toBe(true));

    // expect(result.current.error).toBeDefined();
  });
});
