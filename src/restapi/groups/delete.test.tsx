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

const { login, deleteGroupMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[DELETE] Group', () => {
  test('Hook - Successful', async () => {
    const groupData = {
      groupname: 'new_group',
    };

    await createGroup({ data: groupData, config: cli.config });

    const { result } = renderHook(() => useMutation(deleteGroupMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path: groupData.groupname });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  test('Hook - Failure', async () => {
    const path = '/blah';

    const { result } = renderHook(() => useMutation(deleteGroupMutation()), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({ path });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // @ts-ignore
    expect(result.current.error.status).toBe(404);
    expect(result.current.error).toBeDefined();
  });
});
