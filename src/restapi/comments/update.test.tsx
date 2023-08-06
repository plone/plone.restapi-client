import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { v4 as uuid } from 'uuid';
import { createComment } from './add';
import { getComments } from './get';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateCommentMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Comment', () => {
  test.skip('Hook - Successful', async () => {
    const randomId = uuid();

    const contentData = {
      '@type': 'Document',
      title: 'update-comments-page',
    };

    const addCommentData = {
      text: `This is a comment ${randomId}`,
    };

    await createComment({
      path: contentData.title,
      data: addCommentData,
      config: cli.config,
    });

    const commentData = await getComments({
      path: contentData.title,
      config: cli.config,
    });

    const comment_id = commentData.items[0].comment_id;

    const { result } = renderHook(() => useMutation(updateCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        path: contentData.title,
        comment_id,
        data: addCommentData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test.skip('Hook - Failure', async () => {
    const path = 'blah';
    const comment_id = 'blah';

    const updateCommentData = {
      text: `This is a comment`,
    };

    const { result } = renderHook(() => useMutation(updateCommentMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, comment_id, data: updateCommentData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
