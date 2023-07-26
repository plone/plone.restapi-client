import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { getUniqueEntityName, loginWithCreate } from '../../utils/test';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, resetUserMutation } = cli;

await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] UserReset', () => {
  test('Hook - Successful', async () => {
    const username = getUniqueEntityName('resetTestUser');
    const userData = {
      username,
      email: `${username}@example.com`,
      password: 'password',
      roles: ['Site Administrator'],
    };

    await loginWithCreate(cli, userData);

    const { result } = renderHook(() => useMutation(resetUserMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: userData.username, data: {} });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
