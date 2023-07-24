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

const { login, updateUserPortraitScaleMutation } = cli;
await login({ username: 'admin', password: 'secret' });

beforeEach(async () => {
  await setup();
});

afterEach(async () => {
  await teardown();
});

describe('[PATCH] UserPortraitUpdate', () => {
  test('Hook - Successful', async () => {
    const userData = {
      username: 'updatePortraitScaleTestUser',
      email: 'updatePortraitScaleTestUser@example.com',
      password: 'password',
    };

    const updatePortraitData = {
      portrait: {
        'content-type': 'image/gif',
        data: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
        encoding: 'base64',
        filename: 'image.gif',
        scale: true,
      },
    };

    try {
      await createdUser({ data: userData, config: cli.config });
    } catch (e) {
      // do nothing (user already created)
    }

    const { result } = renderHook(
      () => useMutation(updateUserPortraitScaleMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({
        path: userData.username,
        data: updatePortraitData,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const user = await getUser({ path: userData.username, config: cli.config });

    expect(user.portrait).toBe(
      'http://localhost:55001/plone/@portrait/updatePortraitScaleTestUser',
    );
  });

  test('Hook - Failure', async () => {
    const updatePortraitFailData = {
      portrait: {
        'content-type': 'image/gif',
        data: 'R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
        encoding: 'base64',
        filename: 'image.gif',
        scale: true,
      },
    };

    const { result } = renderHook(
      () => useMutation(updateUserPortraitScaleMutation()),
      {
        wrapper: createWrapper(),
      },
    );

    act(() => {
      result.current.mutate({
        path: '/blah',
        data: updatePortraitFailData,
      });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
  });
});
