import { PloneClientConfig } from '../client';

/*
  configGetter is required instead of using the config directly to make sure
  that the latest config value is used and no closure is held on it
*/
export const queryWithConfig = <T extends { config: PloneClientConfig }, K>(
  method: (args: T) => K,
  configGetter: () => T['config'],
) => {
  return (args: Omit<T, 'config'>) =>
    method({ ...args, config: configGetter() } as T);
};

export const mutationWithConfig = <K>(
  method: (args: { config: PloneClientConfig }) => K,
  configGetter: () => PloneClientConfig,
) => {
  return () => method({ config: configGetter() });
};
