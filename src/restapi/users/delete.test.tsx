import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createdUser } from './created';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, deleteUserMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] UserDelete', () => {
  test('Hook - Successful', async () => {
    const userData = {
      username: 'deleteTestUser',
      email: 'deleteTestUser@example.com',
      password: 'password',
    };

    await createdUser({ data: userData, config: cli.config });

    const { result } = renderHook(() => useMutation(deleteUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: userData.username });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const userData = {
      username: 'deleteTestUserFail',
      email: 'deleteTestUser@exampleFail.com',
      password: 'password',
    };

    await createdUser({ data: userData, config: cli.config });

    const { result } = renderHook(() => useMutation(deleteUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: 'blah' });
    });

    await waitFor(() => expect(result.current.data).toBe(undefined));
  });
});
