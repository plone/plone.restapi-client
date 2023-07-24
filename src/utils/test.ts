import PloneClient from '../client';
import { createdUser } from '../restapi/users/created';

export const loginWithCreate = async (
  cli: PloneClient,
  userData: {
    username: string;
    email?: string;
    password: string;
  },
) => {
  const { username, password, email } = userData;

  if (!email) {
    return cli.login({ username, password });
  }

  try {
    await createdUser({
      data: { username, password, email },
      config: cli.config,
    });
  } catch (e) {
    // handle error if the user has already been creatd in previous invocations
  }

  return cli.login({ username, password });
};
