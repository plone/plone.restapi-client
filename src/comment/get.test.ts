import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper, testServer } from '../testUtils';
import { getCommentsQuery } from './get';
import { createContentQuery } from '../content/add'
import { useQuery } from '@tanstack/react-query';
import Cookies from 'universal-cookie';
import { beforeAll, beforeEach } from 'vitest';
import { setup, teardown } from '../resetFixture';
import { login } from '../login/post';

beforeAll(async () => {
    const cookies = new Cookies();
    const { token } = await login('admin', 'secret');
    cookies.set('auth_token', token);

    const path = '/';
    const data = {
      '@type': 'Document',
      title: 'My Page',
    };

    const { result } = renderHook(
      () => useQuery(createContentQuery({ path, data })),
      {
        wrapper: createWrapper(),
      },
    );
  });
  
  
  beforeEach(async () => {
    await setup();
  });
  
  afterEach(async () => {
    await teardown();
  });

  describe('[GET] Comment', () => {
    test('Hook - Successful', async () => {
      const path = '/front-page/@comments/';
      const { result } = renderHook(() => useQuery(getCommentsQuery({ path })), {
        wrapper: createWrapper(),
      });
  
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
      expect(result.current.data?.["@id"]).toBe('http://localhost:55001/plone/front-page/@comments/');
    });
  
    test('Hook - Failure', async () => {
      const path = '/blah/@comments/';
      const { result } = renderHook(() => useQuery(getCommentsQuery({ path })), {
        wrapper: createWrapper(),
      });
  
      await waitFor(() => expect(result.current.isError).toBe(true));
  
      // console.dir(result.current.error, { depth: null });
      // @ts-ignore
      expect(result.current.error.status).toBe(404);
      expect(result.current.error).toBeDefined();
    });
  
  //   test('Hook - fullobjects', async () => {
  //     const path = '/';
  //     const fullObjects = true;
  //     const { result } = renderHook(
  //       () => useQuery(getCommentsQuery({ path, fullObjects })),
  //       {
  //         wrapper: createWrapper(),
  //       },
  //     );
  
  //     await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  //     expect(result.current.data?.title).toBe('Welcome to Plone 6!');
  //   });
  
    test.skip('Hook - version', async () => {
      const path = '/';
      const version = 'abcd';
      const { result } = renderHook(
        () => useQuery(getCommentsQuery({ path, version })),
        {
          wrapper: createWrapper(),
        },
      );
  
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
      expect(result.current.data?.title).toBe('Welcome to Plone 6!');
    });
  
    test.skip('Hook - fullObjects && version', async () => {
      const path = '/';
      const fullObjects = true;
      const version = 'abcd';
      const { result } = renderHook(
        () => useQuery(getCommentsQuery({ path, fullObjects, version })),
        {
          wrapper: createWrapper(),
        },
      );
  
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
      expect(result.current.data?.title).toBe('Welcome to Plone 6!');
    });
  });
  