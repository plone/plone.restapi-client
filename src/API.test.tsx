import { test, describe } from 'vitest';
import { apiRequest } from './API';

describe('apiRequest', () => {
  test('GET - 200', async () => {
    const path = '/';
    const response = await apiRequest('get', path, {
      config: { apiPath: 'http://localhost:55001/plone' },
      raw: true,
    });

    expect(response.status).toBe(200);
    expect(response.data.title).toBe('Welcome to Plone 6!');
  });

  test('GET - 404', async () => {
    const path = '/asdas';
    await expect(
      apiRequest('get', path, {
        config: { apiPath: 'http://localhost:55001/plone' },
        raw: true,
      }),
    ).rejects.toThrowError('Request failed with status code 404');
  });
});
