import {
  loginQuery as _loginQuery,
  login as _login,
} from './restapi/login/post';
import type { LoginArgs } from './restapi/login/post';

import { getContentQuery as _getContentQuery } from './restapi/content/get';
import { createContentMutation as _createContentMutation } from './restapi/content/add';
import { updateContentMutation as _updateContentMutation } from './restapi/content/update';
import { deleteContentMutation as _deleteContentMutation } from './restapi/content/delete';
import { getBreadcrumbsQuery as _getBreadcrumbsQuery } from './restapi/breadcrumbs/get';
import { getNavigationQuery as _getNavigationQuery } from './restapi/navigation/get';
import { getContextNavigationQuery as _getContextNavigationQuery } from './restapi/contextnavigation/get';
import { getActionsQuery as _getActionsQuery } from './restapi/actions/get';
import { getAliasesQuery as _getAliasesQuery } from './restapi/aliases/get';
import { createAliasesMutation as _createAliasesMutation } from './restapi/aliases/add';
import { deleteAliasesMutation as _deleteAliasesMutation } from './restapi/aliases/delete';
import { getAliasesRootQuery as _getAliasesRootQuery } from './restapi/aliases/get_root';
import { createAliasesRootMutation as _createAliasesRootMutation } from './restapi/aliases/add_root';
import { deleteAliasesRootMutation as _deleteAliasesRootMutation } from './restapi/aliases/delete_root';
import { getAddonsQuery as _getAddonsQuery } from './restapi/addons/get_list';
import { getAddonQuery as _getAddonQuery } from './restapi/addons/get';
import { installAddonMutation as _installAddonMutation } from './restapi/addons/install';
import { installAddonProfileMutation as _installAddonProfileMutation } from './restapi/addons/install_profile';
import { uninstallAddonMutation as _uninstallAddonMutation } from './restapi/addons/unistall';
import { upgradeAddonMutation as _upgradeAddonMutation } from './restapi/addons/upgrade';
import { getDatabaseQuery as _getDatabaseQuery } from './restapi/database/get';

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

  /*
    Breadcrumbs queries
  */
  getBreadcrumbsQuery = queryWithConfig(_getBreadcrumbsQuery, this.getConfig);

  /*
    Navigation queries
  */
  getNavigationQuery = queryWithConfig(_getNavigationQuery, this.getConfig);

  /*
    ContextNavigation queries
  */
  getContextNavigationQuery = queryWithConfig(
    _getContextNavigationQuery,
    this.getConfig,
  );

  /*
    Actions queries
  */
  getActionsQuery = queryWithConfig(_getActionsQuery, this.getConfig);

  /*
    Aliases queries
  */
  getAliasesQuery = queryWithConfig(_getAliasesQuery, this.getConfig);
  createAliasesMutation = mutationWithConfig(
    _createAliasesMutation,
    this.getConfig,
  );
  deleteAliasesMutation = mutationWithConfig(
    _deleteAliasesMutation,
    this.getConfig,
  );
  getAliasesRootQuery = queryWithConfig(_getAliasesRootQuery, this.getConfig);
  createAliasesRootMutation = mutationWithConfig(
    _createAliasesRootMutation,
    this.getConfig,
  );
  deleteAliasesRootMutation = mutationWithConfig(
    _deleteAliasesRootMutation,
    this.getConfig,
  );

  /*
    Addons queries
  */
  getAddonsQuery = queryWithConfig(_getAddonsQuery, this.getConfig);
  getAddonQuery = queryWithConfig(_getAddonQuery, this.getConfig);
  installAddonMutation = mutationWithConfig(
    _installAddonMutation,
    this.getConfig,
  );
  installProfileAddonMutation = mutationWithConfig(
    _installAddonProfileMutation,
    this.getConfig,
  );
  uninstallAddonMutation = mutationWithConfig(
    _uninstallAddonMutation,
    this.getConfig,
  );
  upgradeAddonMutation = mutationWithConfig(
    _upgradeAddonMutation,
    this.getConfig,
  );

  /*
    Database queries
  */
  getDatabaseQuery = queryWithConfig(_getDatabaseQuery, this.getConfig);
}
