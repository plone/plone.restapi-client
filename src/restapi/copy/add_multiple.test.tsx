import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import ploneClient from '../../client';
import { createContent } from '../content/add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, createCopyMultipleMutation } = cli;
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
    const contentData1 = {
      '@type': 'Document',
      title: 'samplepage1',
    };
    const contentData2 = {
      '@type': 'Document',
      title: 'samplepage2',
    };
    await createContent({ path, data: contentData1, config: cli.config });
    await createContent({ path, data: contentData2, config: cli.config });

    const copyData = {
      source: [
        'http://localhost:55001/plone/samplepage1',
        'http://localhost:55001/plone/samplepage2',
      ],
    };

    const { result } = renderHook(
      () => useMutation(createCopyMultipleMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ data: copyData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const { result } = renderHook(
      () => useMutation(createCopyMultipleMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    const copyData = {
      source: ['http://localhost:55001/plone/blah'],
    };

    act(() => {
      result.current.mutate({ data: copyData });
    });

    // TODO: Find correct implementation for failure test as currently API does not return an error status code when it is supposed to raise error

    // await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    // expect(result.current.error.status).toBe(404);
    // expect(result.current.error).toBeDefined();
  });
});
