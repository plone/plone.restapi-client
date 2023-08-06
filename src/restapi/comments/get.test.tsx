import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createComment } from './add';
import { createContent } from '../content/add';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getCommentsQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Comments', () => {
  test.skip('Hook - Successful', async () => {
    const contentData = {
      '@type': 'Document',
      title: 'get-comments-page',
    };

    await createContent({ path: '/', data: contentData, config: cli.config });

    const addCommentData = {
      text: 'This is a comment',
    };

    await createComment({
      path: contentData.title,
      data: addCommentData,
      config: cli.config,
    });

    const { result } = renderHook(
      () => useQuery(getCommentsQuery({ path: contentData.title })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.['@id']).toBe(
      'http://localhost:55001/plone/front-page/@comments',
    );
    expect(result.current.data?.items_total).toBeGreaterThan(0);
  });

  test.skip('Hook - Failure', async () => {
    const path = 'blah';

    const { result } = renderHook(() => useQuery(getCommentsQuery({ path })), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
