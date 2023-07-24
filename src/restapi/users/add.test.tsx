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

const { login, createUserMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] UserAdd', () => {
  test('Hook - Successful', async () => {
    const userData = {
      username: 'addTestUser',
      email: 'addTestUser@example.com',
      sendPasswordReset: true,
    };

    const { result } = renderHook(() => useMutation(createUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ data: userData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe('addTestUser');
  });
});
