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

const { login, uninstallAddonsMutation } = cli;

await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[POST] UninstallAddons', () => {
  test('Hook - Successful', async () => {
    const path = '/plone.app.session';

    const { result } = renderHook(
      () => useMutation(uninstallAddonsMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({ path });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  // TODO: Find correct implementation for failure test as API returns status 204 when it is supposed to raise error
});
