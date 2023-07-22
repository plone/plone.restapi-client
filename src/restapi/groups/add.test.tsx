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

const { login, createGroupMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] Group', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useMutation(createGroupMutation()), {
      wrapper: createWrapper(),
    });

    const groupData = {
      groupname: 'new_group',
    };

    act(() => {
      result.current.mutate({ data: groupData });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.id).toBe('new_group');
  });
});
