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
import { getAddonsListQuery as _getAddonsListQuery } from './restapi/addons/get_list';
import { getAddonsQuery as _getAddonsQuery } from './restapi/addons/get';
import { installAddonsMutation as _installAddonsMutation } from './restapi/addons/install';
import { installAddonsProfileMutation as _installAddonsProfileMutation } from './restapi/addons/install_profile';
import { uninstallAddonsMutation as _uninstallAddonsMutation } from './restapi/addons/unistall';
import { upgradeAddonsMutation as _upgradeAddonsMutation } from './restapi/addons/upgrade';
import { createCopyMutation as _createCopyMutation } from './restapi/copy/get';
import { getDatabaseQuery as _getDatabaseQuery } from './restapi/database/get';
import { getGroupsRootQuery as _getGroupsRootQuery } from './restapi/groups/get_root';
import { getGroupQuery as _getGroupsQuery } from './restapi/groups/get';
import { createGroupMutation as _createGroupMutation } from './restapi/groups/add';
import { updateGroupMutation as _updateGroupMutation } from './restapi/groups/update';
import { deleteGroupMutation as _deleteGroupMutation } from './restapi/groups/delete';
import { getHistoryQuery as _getHistoryQuery } from './restapi/history/get';
import { getHistoryVersionedQuery as _getHistoryVersionedQuery } from './restapi/history/get_versioned';

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
    Addons queries
  */
  getAddonsListQuery = queryWithConfig(_getAddonsListQuery, this.getConfig);
  getAddonsQuery = queryWithConfig(_getAddonsQuery, this.getConfig);
  installAddonsMutation = mutationWithConfig(
    _installAddonsMutation,
    this.getConfig,
  );
  installProfileAddonsMutation = mutationWithConfig(
    _installAddonsProfileMutation,
    this.getConfig,
  );
  uninstallAddonsMutation = mutationWithConfig(
    _uninstallAddonsMutation,
    this.getConfig,
  );
  upgradeAddonsMutation = mutationWithConfig(
    _upgradeAddonsMutation,
    this.getConfig,
  );
  /*
    Copy queries
  */
  createCopyMutation = queryWithConfig(_createCopyMutation, this.getConfig);
  /*
    Database queries
  */
  getDatabaseQuery = queryWithConfig(_getDatabaseQuery, this.getConfig);
  /*
    Group queries
  */
  getGroupsRootQuery = queryWithConfig(_getGroupsRootQuery, this.getConfig);
  getGroupQuery = queryWithConfig(_getGroupsQuery, this.getConfig);
  createGroupMutation = mutationWithConfig(
    _createGroupMutation,
    this.getConfig,
  );
  updateGroupMutation = mutationWithConfig(
    _updateGroupMutation,
    this.getConfig,
  );
  deleteGroupMutation = mutationWithConfig(
    _deleteGroupMutation,
    this.getConfig,
  );
  /*
    History queries
  */
  getHistoryQuery = queryWithConfig(_getHistoryQuery, this.getConfig);
  getHistoryVersionedQuery = queryWithConfig(
    _getHistoryVersionedQuery,
    this.getConfig,
  );
}
