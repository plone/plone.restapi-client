import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useMutation } from '@tanstack/react-query';
import { setup, teardown } from '../../resetFixture';
import { beforeEach } from 'vitest';
import { expect, test } from 'vitest';
import PloneClient from '../../client';
import { createGroup } from './add';

const cli = PloneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { login, updateGroupMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] Group', () => {
  test('Hook - Successful', async () => {
    const groupData = {
      groupname: 'new_group',
    };

    await createGroup({ data: groupData, config: cli.config });

    const { result } = renderHook(() => useMutation(updateGroupMutation()), {
      wrapper: createWrapper(),
    });

    const updateGroupData = {
      groupname: 'changed_name',
    };

    act(() => {
      result.current.mutate({
        path: `/${groupData.groupname}`,
        data: updateGroupData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const path = '/blah';
    const updateGroupData = {
      groupname: 'changed_name',
    };

    const { result } = renderHook(() => useMutation(updateGroupMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path, data: updateGroupData });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(400);
    expect(result.current.error).toBeDefined();
  });
});
