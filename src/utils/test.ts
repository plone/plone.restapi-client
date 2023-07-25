import PloneClient from '../client';
import { createdUser } from '../restapi/users/created';

export const loginWithCreate = async (
  cli: PloneClient,
  {
    username,
    password,
    email,
    roles,
  }: {
    username: string;
    email?: string;
    password: string;
    roles?: string[];
  },
) => {
  if (!email) {
    return cli.login({ username, password });
  }

  try {
    await createdUser({
      data: { username, password, email, roles },
      config: cli.config,
    });
  } catch (e) {
    // handle error if the user has already been creatd in previous invocations
  }

  return cli.login({ username, password });
};

export const getUniqueEntityName = (baseName: string) =>
  `${baseName}${Math.floor(Math.random() * 10000)}`;
