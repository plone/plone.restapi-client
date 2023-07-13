import { getContentQuery } from './restapi/content/get';
import { createContentMutation } from './restapi/content/add';
import { updateContentMutation } from './restapi/content/update';
import { deleteContentMutation } from './restapi/content/delete';
import { loginQuery } from './restapi/login/post';
import ploneClient from './client';

export {
  createContentMutation,
  getContentQuery,
  updateContentMutation,
  loginQuery,
  deleteContentMutation,
};

export default ploneClient;
