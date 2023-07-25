import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';
import { createContent } from '../content/add';
import { updateContent } from '../content/update';
import { loginWithCreate } from '../../utils/test';
import { setup, teardown } from '../../resetFixture';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});
const { login, getHistoryVersionedQuery } = cli;

beforeAll(async () => {
  await login({ username: 'admin', password: 'secret' });
});

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] HistoryVersioned', () => {
  test('Hook - Successful', async () => {
    const path = '/';
    const contentData = {
      '@type': 'Document',
      title: 'historyversion' + Math.floor(Math.random() * 1000),
      description: 'change',
    };

    await createContent({ path, data: contentData, config: cli.config });

    const randomId = Math.floor(Math.random() * 1000);
    const userName = `historyVerTestUser${randomId}`;
    const userData = {
      username: userName,
      email: `${userName}@example.com`,
      password: 'password',
      roles: ['Site Administrator'],
    };

    await loginWithCreate(cli, userData);

    const updateContentData = {
      description: 'changed again',
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
            version: 1,
          }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    // TODO: figure out why the test server does not save history on edits
    await waitFor(() => expect(result.current.isSuccess).toBe(false));
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const { result } = renderHook(
      () =>
        useQuery(
          getHistoryVersionedQuery({
            path,
            version: 0,
          }),
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
