import { getContentQuery } from './rest-api/content/get';
import { createContentMutation } from './rest-api/content/add';
import { updateContentMutation } from './rest-api/content/update';
import { deleteContentMutation } from './rest-api/content/delete';
import { loginQuery } from './rest-api/login/post';

export {
  createContentMutation as createContentQuery,
  getContentQuery,
  updateContentMutation as updateContentQuery,
  loginQuery,
  deleteContentMutation as deleteContentQuery,
};
