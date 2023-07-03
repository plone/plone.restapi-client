import { PloneClientConfig } from '../client';

export const queryWithConfig = <T extends { config: PloneClientConfig }, K>(
  method: (args: T) => K,
  config: T['config'],
) => {
  return (args: Omit<T, 'config'>) => method({ ...args, config } as T);
};

export const mutationWithConfig = <K>(
  method: (args: { config: PloneClientConfig }) => K,
  config: PloneClientConfig,
) => {
  return () => method({ config });
};
