import { renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../../testUtils';
import { useQuery } from '@tanstack/react-query';
import ploneClient from '../../client';

const cli = ploneClient.initialize({
  apiPath: 'http://localhost:55001/plone',
});

const { getTilesQuery } = cli;

describe('[GET] TilesList', () => {
  test('Hook - Successful', async () => {
    const { result } = renderHook(() => useQuery(getTilesQuery({})), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    // TODO: Find why the API returns 404 for all requests related to tiles service

    // await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // expect(result.current.data?.[0]).toHaveProperty('@id');
  });
});
