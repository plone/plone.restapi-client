import { z } from 'zod';

import {
  loginQuery as _loginQuery,
  login as _login,
} from './rest-api/login/post';
import type { LoginArgs } from './rest-api/login/post';

import { getContentQuery as _getContentQuery } from './rest-api/content/get';
import { createContentQuery as _createContentQuery } from './rest-api/content/add';
import { updateContentQuery as _updateContentQuery } from './rest-api/content/update';
import { deleteContentQuery as _deleteContentQuery } from './rest-api/content/delete';

import { mutationWithConfig, queryWithConfig } from './utils/misc';

export const PloneClientConfigSchema = z.object({
  apiPath: z.string(),
  token: z.string().optional(),
});

export type PloneClientConfig = z.infer<typeof PloneClientConfigSchema>;

const PLONECLIENT_DEFAULT_CONFIG = { apiPath: 'http://localhost:8080/Plone' };

export default class PloneClient {
  public config: PloneClientConfig = { apiPath: '/' };

  static initialize = (
    config: PloneClientConfig,
  ): InstanceType<typeof PloneClient> =>
    new PloneClient({ ...PLONECLIENT_DEFAULT_CONFIG, ...config });

  constructor(config: PloneClientConfig) {
    this.config = config;
  }

  login = async (loginArgs: Omit<LoginArgs, 'config'>) => {
    const { token } = await _login({ ...loginArgs, config: this.config });
    this.config.token = token;
    return token;
  };

  loginQuery = queryWithConfig(_loginQuery, this.config);

  /*
    Content queries
  */
  getContentQuery = queryWithConfig(_getContentQuery, this.config);
  createContentQuery = mutationWithConfig(_createContentQuery, this.config);
  updateContentQuery = mutationWithConfig(_updateContentQuery, this.config);
  deleteContentQuery = mutationWithConfig(_deleteContentQuery, this.config);
}
