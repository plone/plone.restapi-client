import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createdUser } from './created';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, getUserQuery } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[GET] User', () => {
  test('Hook - Successful', async () => {
    const userData = {
      username: 'getTestUser',
      email: 'getTestUser@example.com',
      password: 'password',
    };

    await createdUser({ data: userData, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getUserQuery({ path: userData.username })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe('getTestUser');
  });

  test('Hook - Failure', async () => {
    const userData = {
      username: 'getTestUserFail',
      email: 'getTestUser@exampleFail.com',
      password: 'password',
    };

    await createdUser({ data: userData, config: cli.config });

    const { result } = renderHook(
      () => useQuery(getUserQuery({ path: userData.username })),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.data).toBe(undefined));
  });
});
