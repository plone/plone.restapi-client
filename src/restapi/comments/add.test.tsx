import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createCommentMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Comment', () => {
  test.skip('Hook - Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: 'add-comments-page-1',
    };

    const addCommentData = {
      text: `This is a comment ${randomId}`,
    };

    const { result } = renderHook(() => useMutation(createCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: contentData.title, data: addCommentData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test.skip('Hook - Failure', async () => {
    const path = 'blah';

    const addCommentData = {
      text: `This is a comment`,
    };

    const { result } = renderHook(() => useMutation(createCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data: addCommentData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});