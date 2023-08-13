import { PloneClientConfig } from '../interfaces/config';

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

export const flattenToDottedNotation = (
  obj: Record<string, any>,
  prefix = '',
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      Object.assign(result, flattenToDottedNotation(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
};
