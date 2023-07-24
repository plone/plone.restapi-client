import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, createdUserMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] UserCreated', () => {
  test('Hook - Successful', async () => {
    const userData = {
      username: 'createdTestUser',
      email: 'createdTestUser@example.com',
      password: 'password',
    };

    const { result } = renderHook(() => useMutation(createdUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: userData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe('createdTestUser');
  });

  test('Hook - Failure', async () => {
    const userData = {
      username: 'createdTestUserFail',
      email: 'createdTestUserFail@example.com',
      password: 'short',
    };

    const { result } = renderHook(() => useMutation(createdUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: userData });
    });

    // Fails due to password not being minimum length
    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
