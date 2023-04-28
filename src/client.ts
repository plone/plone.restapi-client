import { getContentQuery as _getContentQuery } from './content/get';
import { loginQuery as _loginQuery, login as _login } from './login/post';
import { createContentQuery as _createContentQuery } from './content/add';
import { updateContentQuery as _updateContentQuery } from './content/update';
import { deleteContentQuery as _deleteContentQuery } from './content/delete';
import type { ContentArgs } from './content/get';
import type { MutateContentArgs } from './content/add';
import type { LoginArgs } from './login/post';

export type PloneClientConfig = {
  apiPath: string;
  token?: string;
};

const PLONECLIENT_DEFAULT_CONFIG = { apiPath: 'http://localhost:8080/Plone' };

export default class PloneClient {
  public config: PloneClientConfig;

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

  loginQuery = (loginArgs: Omit<LoginArgs, 'config'>) => {
    return _loginQuery({ ...loginArgs, config: this.config });
  };

  getContentQuery = (contentArgs: Omit<ContentArgs, 'config'>) => {
    return _getContentQuery({ ...contentArgs, config: this.config });
  };

  createContentQuery = (
    mutateContentArgs: Omit<MutateContentArgs, 'config'>,
  ) => {
    return _createContentQuery({ ...mutateContentArgs, config: this.config });
  };

  updateContentQuery = (
    mutateContentArgs: Omit<MutateContentArgs, 'config'>,
  ) => {
    return _updateContentQuery({ ...mutateContentArgs, config: this.config });
  };

  deleteContentQuery = (
    mutateContentArgs: Omit<MutateContentArgs, 'config'>,
  ) => {
    return _deleteContentQuery({ ...mutateContentArgs, config: this.config });
  };
}
