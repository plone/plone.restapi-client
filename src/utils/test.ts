import { v4 as uuid } from 'uuid';

export const getUniqueEntityName = (baseName: string) => `${baseName}${uuid()}`;

export const stripExtraSlash = (path: string) => {
  const pathSegments = path.split('/').filter((segment) => segment !== ''); // Split path and remove empty segments
  const cleanedPath = '/' + pathSegments.join('/'); // Rejoin the path segments with a single slash
  return cleanedPath;
};
