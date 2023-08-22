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
import { getAddonsQuery as _getAddonsQuery } from './restapi/addons/get_list';
import { getAddonQuery as _getAddonQuery } from './restapi/addons/get';
import { installAddonMutation as _installAddonMutation } from './restapi/addons/install';
import { installAddonProfileMutation as _installAddonProfileMutation } from './restapi/addons/install_profile';
import { uninstallAddonMutation as _uninstallAddonMutation } from './restapi/addons/unistall';
import { upgradeAddonMutation as _upgradeAddonMutation } from './restapi/addons/upgrade';
import { getDatabaseQuery as _getDatabaseQuery } from './restapi/database/get';
import { getGroupQuery as _getGroupQuery } from './restapi/groups/get';
import { createGroupMutation as _createGroupMutation } from './restapi/groups/add';
import { getGroupsQuery as _getGroupsQuery } from './restapi/groups/get_list';
import { updateGroupMutation as _updateGroupMutation } from './restapi/groups/update';
import { deleteGroupMutation as _deleteGroupMutation } from './restapi/groups/delete';
import { getHistoryQuery as _getHistoryQuery } from './restapi/history/get';
import { getHistoryVersionedQuery as _getHistoryVersionedQuery } from './restapi/history/get_versioned';
import { revertHistoryMutation as _revertHistoryMutation } from './restapi/history/revert';
import { getUsersQuery as _getUsersQuery } from './restapi/users/get_list';
import { getUserQuery as _getUserQuery } from './restapi/users/get';
import { createUserMutation as _createUserMutation } from './restapi/users/add';
import { deleteUserMutation as _deleteUserMutation } from './restapi/users/delete';
import { resetPasswordMutation as _resetPasswordMutation } from './restapi/users/reset_password';
import { resetPasswordWithTokenMutation as _resetPasswordWithTokenMutation } from './restapi/users/reset_password_with_token';
import { updatePasswordMutation as _updatePasswordMutation } from './restapi/users/update_password';
import { updateUserMutation as _updateUserMutation } from './restapi/users/update';
import { getWorkflowQuery as _getWorkflowQuery } from './restapi/workflow/get';
import { createWorkflowMutation as _createWorkflowMutation } from './restapi/workflow/add';
import { getVocabulariesListQuery as _getVocabulariesListQuery } from './restapi/vocabularies/get_list';
import { getVocabulariesQuery as _getVocabulariesQuery } from './restapi/vocabularies/get';
import { getQueryStringQuery as _getQueryStringQuery } from './restapi/querystring/get';
import { getNavrootQuery as _getNavrootQuery } from './restapi/navroot/get';
import { getTypesQuery as _getTypesQuery } from './restapi/types/get_list';
import { getTypeQuery as _getTypeQuery } from './restapi/types/get';
import { getTypeFieldQuery as _getTypeFieldQuery } from './restapi/types/get_type_field';
import { createTypeFieldMutation as _createTypeFieldMutation } from './restapi/types/add';
import { updateTypeFieldMutation as _updateTypeFieldMutation } from './restapi/types/update';
import { getAliasesListQuery as _getAliasesListQuery } from './restapi/aliases/get_list';
import { createAliasesMultipleMutation as _createAliasesMultipleMutation } from './restapi/aliases/add_multiple';

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
  getAliasesListQuery = queryWithConfig(_getAliasesListQuery, this.getConfig);
  createAliasesMultipleMutation = mutationWithConfig(
    _createAliasesMultipleMutation,
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
  /*
    Group queries
  */
  getGroupsQuery = queryWithConfig(_getGroupsQuery, this.getConfig);
  getGroupQuery = queryWithConfig(_getGroupQuery, this.getConfig);
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
  revertHistoryMutation = mutationWithConfig(
    _revertHistoryMutation,
    this.getConfig,
  );

  /*
    User queries
  */
  getUsersQuery = queryWithConfig(_getUsersQuery, this.getConfig);
  getUserQuery = queryWithConfig(_getUserQuery, this.getConfig);
  createUserMutation = mutationWithConfig(_createUserMutation, this.getConfig);
  deleteUserMutation = mutationWithConfig(_deleteUserMutation, this.getConfig);
  resetPasswordMutation = mutationWithConfig(
    _resetPasswordMutation,
    this.getConfig,
  );
  resetPasswordWithTokenMutation = mutationWithConfig(
    _resetPasswordWithTokenMutation,
    this.getConfig,
  );
  updatePasswordMutation = mutationWithConfig(
    _updatePasswordMutation,
    this.getConfig,
  );
  updateUserMutation = mutationWithConfig(_updateUserMutation, this.getConfig);

  /*
    Workflow queries
  */
  getWorkflowQuery = queryWithConfig(_getWorkflowQuery, this.getConfig);
  createWorkflowMutation = mutationWithConfig(
    _createWorkflowMutation,
    this.getConfig,
  );

  /*
    Vocabularies queries
  */
  getVocabulariesListQuery = queryWithConfig(
    _getVocabulariesListQuery,
    this.getConfig,
  );
  getVocabulariesQuery = queryWithConfig(_getVocabulariesQuery, this.getConfig);

  /*
    Querystring queries
  */
  getQueryStringQuery = queryWithConfig(_getQueryStringQuery, this.getConfig);

  /*
    Navroot queries
  */
  getNavrootQuery = queryWithConfig(_getNavrootQuery, this.getConfig);

  /*
    Type queries
  */
  getTypesQuery = queryWithConfig(_getTypesQuery, this.getConfig);
  getTypeQuery = queryWithConfig(_getTypeQuery, this.getConfig);
  getTypeFieldQuery = queryWithConfig(_getTypeFieldQuery, this.getConfig);
  createTypeFieldMutation = mutationWithConfig(
    _createTypeFieldMutation,
    this.getConfig,
  );
  updateTypeFieldMutation = mutationWithConfig(
    _updateTypeFieldMutation,
    this.getConfig,
  );
}
