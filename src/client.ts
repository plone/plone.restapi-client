import {
  loginQuery as _loginQuery,
  login as _login,
} from './rest-api/login/post';
import type { LoginArgs } from './rest-api/login/post';

import { getContentQuery as _getContentQuery } from './rest-api/content/get';
import { createContentMutation as _createContentMutation } from './rest-api/content/add';
import { updateContentMutation as _updateContentMutation } from './rest-api/content/update';
import { deleteContentMutation as _deleteContentMutation } from './rest-api/content/delete';

import { mutationWithConfig, queryWithConfig } from './utils/misc';
import { PloneClientConfig } from './interfaces/config';

const PLONECLIENT_DEFAULT_CONFIG = { apiPath: 'http://localhost:8080/Plone' };

export default class PloneClient {
  public config: PloneClientConfig = PLONECLIENT_DEFAULT_CONFIG;

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

  getConfig = () => {
    return this.config;
  };
  /*
    Conventionally, get<Entity>Query naming scheme should be used for
    objects that are supposed to be used with `useQuery` by the user.

    Similarily, create<Entity>Mutation naming scheme would be used for
    objects that are supposed to be used with `useMutation` by the user.
  */

  /*
    Initialization queries
  */
  loginQuery = queryWithConfig(_loginQuery, this.getConfig);

  /*
    Content queries
  */
  getContentQuery = queryWithConfig(_getContentQuery, this.getConfig);
  createContentMutation = mutationWithConfig(
    _createContentMutation,
    this.getConfig,
  );
  updateContentMutation = mutationWithConfig(
    _updateContentMutation,
    this.getConfig,
  );
  deleteContentMutation = mutationWithConfig(
    _deleteContentMutation,
    this.getConfig,
  );
}
