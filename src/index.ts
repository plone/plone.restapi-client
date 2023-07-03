import { getContentQuery } from './restapi/content/get';
import { createContentMutation } from './restapi/content/add';
import { updateContentMutation } from './restapi/content/update';
import { deleteContentMutation } from './restapi/content/delete';
import { loginQuery } from './restapi/login/post';

export {
  createContentMutation as createContentMutation,
  getContentQuery,
  updateContentMutation as updateContentMutation,
  loginQuery,
  deleteContentMutation as deleteContentMutation,
};
