import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { createdUser } from '../users/created';
import { updateContent } from '../content/update';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, getHistoryVersionedQuery } = cli;
await login({ username: 'admin', password: 'secret' });

describe('[GET] Groups', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'historyVersion',
    };
    await createContent({ path, data: contentData, config: cli.config });

    const userData = {
      username: 'historyVerTestUser',
      email: 'historyVerTestUser@example.com',
      password: 'password',
    };

    await createdUser({ data: userData, config: cli.config });

    // await login({ username: userData.username, password: userData.password });

    const updateContentData = {
      description: 'changed',
    };

    await updateContent({
      path: contentData.title,
      data: updateContentData,
      config: cli.config,
    });

    const { result } = renderHook(
      () =>
        useQuery(
          getHistoryVersionedQuery({
            path: contentData.title,
            version: 0,
          }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    console.log(result.current.data);
  });

  // test('Hook - Failure', async () => {
  //   const path = '/blah';
  //   const { result } = renderHook(() => useQuery(getHistoryQuery({ path })), {
  //     wrapper: createWrapper(),
  //   });

  //   await waitFor(() => expect(result.current.isError).toBe(true));
  //   path;

  //   expect(result.current.error).toBeDefined();
  // });
});
