import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createdUser } from './created';
import { getUser } from './get';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateUserMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] UserUpdate', () => {
  test('Hook - Successful', async () => {
    const userData = {
      username: 'updateTestUser',
      email: 'updateTestUser@example.com',
      password: 'password',
    };

    const updateUserData = {
      username: 'changedUsername',
    };

    await createdUser({ data: userData, config: cli.config });

    const { result } = renderHook(() => useMutation(updateUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        path: userData.username,
        data: updateUserData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const user = await getUser({ path: userData.username, config: cli.config });

    expect(user.username).toBe('changedUsername');
  });

  // TODO: Find correct implementation for failure test, currently no error is returned on updating non existing user
});